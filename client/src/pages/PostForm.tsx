import {
  Await,
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router"
import { getUsers } from "../api/users"
import type { User } from "./User"
import { createPost, editPost, getPostById } from "../api/posts"
import { FormGroup } from "../components/FormGroup"
import type { Post } from "./Post"
import { Suspense } from "react"
import { SkeletonInput } from "../components/Skeleton"

function PostForm() {
  type LoaderData = {
    usersPromise: Promise<User[]>
    postPromise?: Promise<Post>
  }

  const { usersPromise, postPromise }: LoaderData = useLoaderData()
  const actionData = useActionData() as { errors?: Record<string, string> }
  const { state } = useNavigation()
  const isSubmitting = state === "submitting" || state === "loading"

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <FormGroup error={actionData?.errors?.title}>
            <label htmlFor="title">Title</label>
            <Suspense fallback={<SkeletonInput />}>
              <Await resolve={postPromise}>
                {(post) => (
                  <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={post ? post.title : ""}
                  />
                )}
              </Await>
            </Suspense>
          </FormGroup>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <Suspense fallback={<SkeletonInput />}>
              <Await resolve={postPromise}>
                {(post) => (
                  <select
                    name="userId"
                    id="userId"
                    defaultValue={post ? post.userId : "1"}
                  >
                    <Suspense fallback={<option>Loading...</option>}>
                      <Await resolve={usersPromise}>
                        {(users) =>
                          users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))
                        }
                      </Await>
                    </Suspense>
                  </select>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="form-row">
          <FormGroup error={actionData?.errors?.body}>
            <label htmlFor="body">Body</label>
            <Suspense fallback={<SkeletonInput />}>
              <Await resolve={postPromise}>
                {(post) => (
                  <textarea
                    name="body"
                    id="body"
                    defaultValue={post ? post.body : ""}
                  />
                )}
              </Await>
            </Suspense>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn" disabled={isSubmitting}>
            {postPromise
              ? isSubmitting
                ? "Saving"
                : "Save"
              : isSubmitting
              ? "Creating"
              : "Create"}
          </button>
        </div>

        {actionData?.errors?.form && (
          <div className="error-message">{actionData.errors.form}</div>
        )}
      </Form>
    </>
  )
}

async function loader({ request: { signal }, params }: LoaderFunctionArgs) {
  const usersPromise = getUsers({ signal })

  if (params.id) {
    const postPromise = getPostById(params.id, { signal })
    return { usersPromise, postPromise }
  }

  return { usersPromise }
}

async function action({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData()
  const title = formData.get("title")
  const userId = formData.get("userId")
  const body = formData.get("body")

  if (
    typeof title !== "string" ||
    typeof body !== "string" ||
    typeof userId !== "string"
  )
    return { errors: { form: "Invalid form data" }, status: 400 }

  const errors: Record<string, string> = {}
  if (title.trim() === "") errors.title = "Title is required"
  if (body.trim() === "") errors.body = "Body is required"

  if (Object.keys(errors).length > 0) return { errors, status: 400 }

  if (params.id) {
    await editPost(params.id, { title, userId: Number(userId), body })
    return redirect(`/posts/${params.id}`)
  }

  await createPost({ title, userId: Number(userId), body })
  return redirect("/posts")
}

export const PostFormRoute = {
  element: <PostForm />,
  loader,
  action,
}

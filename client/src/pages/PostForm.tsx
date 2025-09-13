import {
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

function PostForm() {
  type LoaderData = {
    users: User[]
    post?: Post
  }

  const { users, post }: LoaderData = useLoaderData()
  const actionData = useActionData() as { errors?: Record<string, string> }
  const { state } = useNavigation()
  const isLoading = state === "submitting" || state === "loading"

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <FormGroup error={actionData?.errors?.title}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post ? post.title : ""}
            />
          </FormGroup>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select
              name="userId"
              id="userId"
              defaultValue={post ? post.userId : "1"}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <FormGroup error={actionData?.errors?.body}>
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              id="body"
              defaultValue={post ? post.body : ""}
            ></textarea>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn" disabled={isLoading}>
            Create
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
  const users = getUsers({ signal })

  if (params.id) {
    const post = getPostById(params.id, { signal })
    return { users: await users, post: await post }
  }

  return { users: await users }
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

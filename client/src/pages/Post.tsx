import {
  Await,
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router"
import { getComments, getPostById } from "../api/posts"
import { getUserById } from "../api/users"
import type { User } from "./User"
import { Suspense } from "react"
import { SkeletonList, SkeletonText } from "../components/Skeleton"

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

type LoaderData = {
  postPromise: Promise<Post>
  userPromise: Promise<User>
  commentsPromise: Promise<Comment[]>
}

function Post() {
  const { postPromise, userPromise, commentsPromise }: LoaderData =
    useLoaderData()

  return (
    <>
      <h1 className="page-title">
        <Suspense
          fallback={
            <>
              <SkeletonText />
              <div className="title-btns">
                <button className="btn btn-outline">Edit</button>
              </div>
            </>
          }
        >
          <Await resolve={postPromise}>
            {(post) => (
              <>
                {post.title}
                <div className="title-btns">
                  <Link
                    className="btn btn-outline"
                    to={`/posts/${post.id}/edit`}
                  >
                    Edit
                  </Link>
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </h1>
      <span className="page-subtitle">
        By:{" "}
        <Suspense fallback={<SkeletonText width="25%" inline />}>
          <Await resolve={userPromise}>
            {(user) => <Link to={`../../users/${user.id}`}>{user.name}</Link>}
          </Await>
        </Suspense>
      </span>
      <div>
        <Suspense
          fallback={
            <SkeletonList amount={4}>
              <SkeletonText />
            </SkeletonList>
          }
        >
          <Await resolve={postPromise}>{(post) => post.body}</Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <SkeletonText width="25%" />
                  </div>
                  <SkeletonText />
                  <SkeletonText width="75%" />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Await resolve={commentsPromise}>
            {(comments) =>
              comments.map((comment) => (
                <div key={comment.id} className="card">
                  <div className="card-body">
                    <div className="text-sm mb-1">{comment.email}</div>
                    {comment.body}
                  </div>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  )
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  if (!params.id) return
  const postPromise = getPostById(params.id, { signal })
  const userPromise = postPromise.then((post) =>
    getUserById(post.userId, { signal })
  )
  const commentsPromise = postPromise.then((post) =>
    getComments(post.id, { signal })
  )

  return { postPromise, userPromise, commentsPromise }
}

export const postRoute = {
  element: <Post />,
  loader,
}

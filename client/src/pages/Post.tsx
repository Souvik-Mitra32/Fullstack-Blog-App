import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getComments, getPostById } from "../api/posts"
import { getUserById } from "../api/users"
import type { User } from "./User"

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
  post: Post
  user: User
  comments: Comment[]
}

function Post() {
  const { post, user, comments }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`../../users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  if (!params.id) return
  const post = await getPostById(params.id, { signal })
  const user = getUserById(post.userId, { signal })
  const comments = getComments(post.id, { signal })

  return { post, user: await user, comments: await comments }
}

export const postRoute = {
  element: <Post />,
  loader,
}

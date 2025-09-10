import { useLoaderData, Link, type LoaderFunctionArgs } from "react-router"
import { getPosts } from "../api/posts"
import type { Post } from "./Post"

type LoaderData = {
  posts: Post[]
}

function PostList() {
  const { posts }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={post.id.toString()}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

async function loader({ request: { signal } }: LoaderFunctionArgs) {
  const posts = getPosts({ signal })

  return { posts: await posts }
}

export const postListRoute = {
  element: <PostList />,
  loader,
}

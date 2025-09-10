import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getUserById } from "../api/users"
import { getPostsByUserId } from "../api/posts"
import type { Post } from "./Post"
import { getTodosByUserId } from "../api/todos"
import type { Todo } from "./TodoList"

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type LoaderData = {
  user: User
  posts: Post[]
  todos: Todo[]
}

function User() {
  const { user, posts, todos }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite}{" "}
        {user.address.city} {user.address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`../../posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
        <h3 className="mt-4 mb-2">Todos</h3>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : undefined}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  if (!params.id) return
  const user = await getUserById(params.id, { signal })
  const posts = getPostsByUserId(user.id, { signal })
  const todos = getTodosByUserId(user.id, { signal })

  return { user, posts: await posts, todos: await todos }
}

export const userRoute = {
  element: <User />,
  loader,
}

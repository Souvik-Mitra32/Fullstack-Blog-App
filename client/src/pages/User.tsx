import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getUserById } from "../api/users"
import type { Post } from "./Post"
import { getTodosByUserId } from "../api/todos"
import type { Todo } from "./TodoList"
import { getPosts } from "../api/posts"
import { PostCard } from "../components/PostCard"
import { TodoItem } from "../components/TodoItem"

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
          <PostCard key={post.id} {...post} throughUser />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  if (!params.id) return
  const user = await getUserById(params.id, { signal })
  const posts = getPosts({ userId: user.id }, { signal })
  const todos = getTodosByUserId(user.id, { signal })

  return { user, posts: await posts, todos: await todos }
}

export const userRoute = {
  element: <User />,
  loader,
}

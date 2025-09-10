import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getTodos } from "../api/todos"

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type LoaderData = {
  todos: Todo[]
}

function TodoList() {
  const { todos }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">Todos</h1>
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
    </>
  )
}

async function loader({ request: { signal } }: LoaderFunctionArgs) {
  const todos = getTodos({ signal })

  return { todos: await todos }
}

export const todoListRoute = {
  element: <TodoList />,
  loader,
}

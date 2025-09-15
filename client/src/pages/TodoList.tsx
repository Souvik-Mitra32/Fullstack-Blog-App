import { Await, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getTodos } from "../api/todos"
import { TodoItem } from "../components/TodoItem"
import { Suspense } from "react"
import { SkeletonList, SkeletonText } from "../components/Skeleton"

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type LoaderData = {
  todosPromise: Promise<Todo[]>
}

function TodoList() {
  const { todosPromise }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <Suspense
        fallback={
          <ul>
            <SkeletonList amount={15}>
              <li>
                <SkeletonText width="75%" />
              </li>
            </SkeletonList>
          </ul>
        }
      >
        <ul>
          <Await resolve={todosPromise}>
            {(todos) =>
              todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            }
          </Await>
        </ul>
      </Suspense>
    </>
  )
}

async function loader({ request: { signal } }: LoaderFunctionArgs) {
  const todosPromise = getTodos({ signal })
  return { todosPromise }
}

export const todoListRoute = {
  element: <TodoList />,
  loader,
}

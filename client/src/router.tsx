import {
  createBrowserRouter,
  isRouteErrorResponse,
  Navigate,
  Outlet,
  useRouteError,
} from "react-router"
import { RootLayout } from "./layouts/RootLayout"
import { postListRoute } from "./pages/PostList"
import { userListRoute } from "./pages/UserList"
import { todoListRoute } from "./pages/TodoList"
import { postRoute } from "./pages/Post"
import { userRoute } from "./pages/User"
import { PostFormRoute } from "./pages/PostForm"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/posts" replace />,
      },
      {
        element: <Outlet />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: "posts",
            children: [
              { index: true, ...postListRoute },
              {
                path: ":id",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...PostFormRoute },
                ],
              },
              { path: "new", ...PostFormRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":id", ...userRoute },
            ],
          },
          { path: "todos", ...todoListRoute },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorComponent /> },
])

function ErrorComponent() {
  const error = useRouteError()
  const inProd = import.meta.env.MODE === "production"

  if (isRouteErrorResponse(error)) {
    // here TS knows `error` has status, statusText, and data
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        {!inProd && <pre>{JSON.stringify(error.data, null, 2)}</pre>}
      </>
    )
  }

  if (error instanceof Error) {
    // here TS knows error is a real JS Error
    return (
      <>
        <h1>{error.message}</h1>
        {!inProd && <pre>{error.stack}</pre>}
      </>
    )
  }

  return <h1>Unknown error occurred</h1>
}

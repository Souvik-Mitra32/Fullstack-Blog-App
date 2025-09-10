import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getUsers } from "../api/users"
import type { User } from "./User"

type LoaderData = {
  users: User[]
}

function UserList() {
  const { users }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>{user.company.name}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={user.id.toString()}>
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
  const users = getUsers({ signal })

  return { users: await users }
}

export const userListRoute = {
  element: <UserList />,
  loader,
}

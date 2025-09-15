import {
  Await,
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router"
import { getUsers } from "../api/users"
import type { User } from "./User"
import { Suspense } from "react"
import {
  SkeletonButton,
  SkeletonList,
  SkeletonText,
} from "../components/Skeleton"

type LoaderData = {
  usersPromise: Promise<User[]>
}

function UserList() {
  const { usersPromise }: LoaderData = useLoaderData()

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <div className="card">
                <div className="card-header">
                  <SkeletonText />
                </div>
                <div className="card-body">
                  <SkeletonText />
                  <SkeletonText />
                  <SkeletonText />
                </div>
                <div className="card-footer">
                  <SkeletonButton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Await resolve={usersPromise}>
            {(users) =>
              users.map((user) => (
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
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  )
}

async function loader({ request: { signal } }: LoaderFunctionArgs) {
  const usersPromise = getUsers({ signal })
  return { usersPromise }
}

export const userListRoute = {
  element: <UserList />,
  loader,
}

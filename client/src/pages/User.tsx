import { Await, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getUserById } from "../api/users"
import type { Post } from "./Post"
import { getTodosByUserId } from "../api/todos"
import type { Todo } from "./TodoList"
import { getPosts } from "../api/posts"
import { PostCard, PostCardSkeleton } from "../components/PostCard"
import { TodoItem } from "../components/TodoItem"
import {
  CustomSuspense,
  SkeletonList,
  SkeletonText,
} from "../components/Skeleton"
import { Suspense } from "react"

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
  userPromise: Promise<User>
  postsPromise: Promise<Post[]>
  todosPromise: Promise<Todo[]>
}

function User() {
  const { userPromise, postsPromise, todosPromise }: LoaderData =
    useLoaderData()

  return (
    <>
      <h1 className="page-title">
        <CustomSuspense promise={userPromise} fallback={<SkeletonText />}>
          {(user) => user.name}
        </CustomSuspense>
      </h1>
      <div className="page-subtitle">
        <CustomSuspense promise={userPromise} fallback={<SkeletonText />}>
          {(user) => user.email}
        </CustomSuspense>
      </div>
      <div>
        <b>Company:</b>{" "}
        <CustomSuspense
          promise={userPromise}
          fallback={<SkeletonText width="75%" inline />}
        >
          {(user) => user.company.name}
        </CustomSuspense>
      </div>
      <div>
        <b>Website:</b>{" "}
        <CustomSuspense
          promise={userPromise}
          fallback={<SkeletonText width="75%" inline />}
        >
          {(user) => user.website}
        </CustomSuspense>
      </div>
      <div>
        <b>Address:</b>{" "}
        <CustomSuspense
          promise={userPromise}
          fallback={<SkeletonText width="75%" inline />}
        >
          {(user) => `${user.address.street} ${user.address.suite}{" "}
            ${user.address.city} ${user.address.zipcode}`}
        </CustomSuspense>
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <PostCardSkeleton />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {(posts) =>
              posts.map((post) => (
                <PostCard key={post.id} {...post} throughUser />
              ))
            }
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <SkeletonText width="75%" />
              </li>
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {(todos) =>
              todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            }
          </Await>
        </Suspense>
      </ul>
    </>
  )
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  if (!params.id) return
  const userPromise = getUserById(params.id, { signal })
  const postsPromise = userPromise.then((user) =>
    getPosts({ userId: user.id }, { signal })
  )
  const todosPromise = userPromise.then((user) =>
    getTodosByUserId(user.id, { signal })
  )

  return { userPromise, postsPromise, todosPromise }
}

export const userRoute = {
  element: <User />,
  loader,
}

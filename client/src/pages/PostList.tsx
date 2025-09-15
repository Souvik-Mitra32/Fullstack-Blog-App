import {
  useLoaderData,
  Link,
  type LoaderFunctionArgs,
  Form,
  Await,
} from "react-router"
import { getPosts } from "../api/posts"
import type { Post } from "./Post"
import { getUsers } from "../api/users"
import type { User } from "./User"
import { Suspense, useEffect, useRef } from "react"
import { PostCard, PostCardSkeleton } from "../components/PostCard"
import { SkeletonList } from "../components/Skeleton"

export type SearchedQuery = {
  q?: string
  userId?: string
}

type LoaderData = {
  postsPromise: Promise<Post[]>
  usersPromise: Promise<User[]>
  searchedQuery: SearchedQuery
}

function PostList() {
  const {
    postsPromise,
    usersPromise,
    searchedQuery: { q, userId },
  }: LoaderData = useLoaderData()
  const queryRef = useRef<HTMLInputElement>(null)
  const userIdRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (queryRef.current != null) queryRef.current.value = q || ""
    if (userIdRef.current != null) userIdRef.current.value = userId || ""
  }, [q, userId])

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <Suspense
              fallback={
                <select itemType="search" name="userId" id="userId" disabled>
                  <option value="">Loading...</option>
                </select>
              }
            >
              <Await resolve={usersPromise}>
                {(users) => (
                  <select
                    itemType="search"
                    name="userId"
                    id="userId"
                    ref={userIdRef}
                  >
                    <option value="">Any</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </Await>
            </Suspense>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
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
              posts.map((post) => <PostCard key={post.id} {...post} />)
            }
          </Await>
        </Suspense>
      </div>
    </>
  )
}

async function loader({ request }: LoaderFunctionArgs) {
  const signal = request.signal
  const url = new URL(request.url)
  const q = url.searchParams.get("query") || ""
  const userId = url.searchParams.get("userId") || ""
  const searchedQuery: SearchedQuery = {}

  if (q.trim() !== "") searchedQuery.q = q
  if (userId.trim() !== "") searchedQuery.userId = userId

  const postsPromise = getPosts(searchedQuery, { signal })
  const usersPromise = getUsers({ signal })

  return { postsPromise, usersPromise, searchedQuery }
}

export const postListRoute = {
  element: <PostList />,
  loader,
}

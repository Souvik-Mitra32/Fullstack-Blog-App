import type { Post } from "../pages/Post"
import type { SearchedQuery } from "../pages/PostList"
import { baseApi, type Options } from "./base"

export async function getPosts({ q, userId }: SearchedQuery, options: Options) {
  const queries: string[] = []

  if (q) queries.push(`q=${q}`)
  if (userId) queries.push(`userId=${userId}`)

  let SearchedQueries = ""
  if (queries.length > 0) SearchedQueries = `?${queries.join("&")}`

  const { data: res } = await baseApi.get(`/posts${SearchedQueries}`, options)
  return res.data
}

export async function getPostById(id: string, options: Options) {
  const { data: res } = await baseApi.get(`/posts/${id}`, options)
  return res.data
}

export async function getComments(id: string, options: Options) {
  const { data: res } = await baseApi.get(`/posts/${id}/comments`, options)
  return res.data
}

export async function createPost(postData: Omit<Post, "id">) {
  const { data: res } = await baseApi.post("/posts", postData)
  return res.data
}

export async function editPost(id: string, postData: Omit<Post, "id">) {
  const { data: res } = await baseApi.put(`/posts/${id}`, postData)
  return res.data
}

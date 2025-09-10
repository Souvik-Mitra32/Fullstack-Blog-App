import { baseApi, type Options } from "./base"

export async function getPosts(options: Options) {
  const { data: res } = await baseApi.get("/posts", options)
  return res.data
}

export async function getPostsByUserId(userId: string, options: Options) {
  const { data: res } = await baseApi.get(`/posts?userId=${userId}`, options)
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

import { baseApi, type Options } from "./base"

export async function getUsers(options: Options) {
  const { data: res } = await baseApi.get("/users", options)
  return res.data
}

export async function getUserById(id: string, options: Options) {
  const { data: res } = await baseApi.get(`/users/${id}`, options)
  return res.data
}

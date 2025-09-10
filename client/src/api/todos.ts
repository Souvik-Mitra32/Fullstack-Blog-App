import { baseApi, type Options } from "./base"

export async function getTodos(options: Options) {
  const { data: res } = await baseApi.get("/todos", options)
  return res.data
}

export async function getTodosByUserId(userId: string, options: Options) {
  const { data: res } = await baseApi.get(`/todos?userId=${userId}`, options)
  return res.data
}

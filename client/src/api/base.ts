import axios from "axios"

export type Options = {
  signal: AbortSignal
}

export const baseApi = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

if (import.meta.env.VITE_SLOW_API === "true") {
  baseApi.interceptors.response.use((res) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, 1000)
    })
  })
}

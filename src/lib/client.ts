import axios, {
  AxiosRequestConfig,
} from "axios"
import { parseSessionCookie } from "./utils"

// create a new axios client
// create a request function that uses the client
// export both the client and the request function

export const client = axios.create({
  baseURL: "http://localhost:4000",
})

export async function request(
  config: AxiosRequestConfig
) {
  if (typeof window === "undefined") {
    const { cookies } = await import(
      "next/headers"
    )

    const rawSession = cookies().get(
      "USER_SESSION"
    )?.value

    if (rawSession) {
      const session =
        parseSessionCookie(rawSession)

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session.accessToken}`,
      }
    }
  }

  return client.request(config)
}

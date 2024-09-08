import "server-only"

import { cookies } from "next/headers"
import { Session } from "./types"
import { cookieName } from "./storage"

const BACKEND_URL =
  "http://localhost:4000"

export async function getSession(): Promise<Session | null> {
  const accessToken =
    cookies().get(cookieName)?.value

  if (!accessToken) {
    return null
  }

  const res = await fetch(
    `${BACKEND_URL}/v1/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!res.ok) {
    return null
  }

  const user = await res.json()

  return {
    user,
    accessToken,
  }
}

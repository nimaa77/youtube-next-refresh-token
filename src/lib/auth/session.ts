import "server-only"

import { cookies } from "next/headers"
import { Session } from "./types"
import { cookieName } from "./storage"
import { parseSessionCookie } from "../utils"

const BACKEND_URL =
  "http://localhost:4000"

export async function refreshTokenSet(
  refreshToken: string
) {
  const res = await fetch(
    `${BACKEND_URL}/v1/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    }
  )

  if (!res.ok) {
    console.error(await res.json())
    throw new Error(
      "Failed to refresh token"
    )
  }

  const data = await res.json()

  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    accessTokenExpires:
      data.accessToken_expires,
  }
}

export async function getSession(): Promise<Session | null> {
  const rawSession =
    cookies().get(cookieName)?.value

  if (!rawSession) {
    return null
  }

  const session = JSON.parse(rawSession)

  const {
    accessToken,
    accessTokenExpires,
  } = session

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
    accessTokenExpires,
  }
}

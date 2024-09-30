"use server"

import memoize from "memoizee"
import { cookies } from "next/headers"

import { refreshTokenSet } from "@/lib/auth/session"
import {
  cookieName,
  saveSession,
} from "@/lib/auth/storage"
import { parseSessionCookie } from "@/lib/utils"

// handle race conditions by using a shared cache
// you can use memoizee helper to cache the refresh token function
// use saved refreshToken as the cache key
/*
  normalizer: function (args) {
    return JSON.stringify(args[0]);
  },
*/

const refreshTokenSetMemoized = memoize(
  refreshTokenSet,
  {
    maxAge: 30_000,
    promise: true,
    normalizer: (args) =>
      JSON.stringify(args[0]),
  }
)

export const refreshToken =
  async () => {
    // read the session cookie
    const rawSession =
      cookies().get(cookieName)?.value

    if (!rawSession) {
      throw new Error(
        "Session cookie not found"
      )
    }

    // extract the refresh token
    const { refreshToken } =
      parseSessionCookie(rawSession)

    const newSession =
      await refreshTokenSetMemoized(
        refreshToken
      )

    saveSession(newSession)

    return newSession
  }

import z from "zod"

import {
  type ClassValue,
  clsx,
} from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(
  ...inputs: ClassValue[]
) {
  return twMerge(clsx(inputs))
}

const sessionCookieSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
  accessTokenExpires: z.number(),
})

export function parseSessionCookie(
  cookie: string
) {
  try {
    const session =
      sessionCookieSchema.parse(
        JSON.parse(cookie)
      )
    return session
  } catch {
    throw new Error(
      "Failed to parse session cookie"
    )
  }
}

// check if the access token is expired
export function isSessionExpired(
  accessTokenExpires: number
) {
  return Date.now() > accessTokenExpires
}

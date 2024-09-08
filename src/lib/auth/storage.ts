import { cookies } from "next/headers"

export const cookieName = "USER_SESSION"

export function saveSession(
  accessToken: string
) {
  cookies().set(
    cookieName,
    accessToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
    }
  )
}

export function removeSession() {
  cookies().delete(cookieName)
}

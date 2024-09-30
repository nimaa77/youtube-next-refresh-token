import {
  NextRequest,
  NextResponse,
} from "next/server"

import { cookieName } from "@/lib/auth/storage"
import { refreshTokenSet } from "./session"
import {
  parseSessionCookie,
  isSessionExpired,
} from "../utils"

export async function middleware(
  request: NextRequest
) {
  // read the session cookie from the request
  const rawSession =
    request.cookies.get(
      cookieName
    )?.value

  // if the session cookie is not present
  // redirect to the signin page

  if (!rawSession) {
    return redirectToSignIn(request)
  }

  const session =
    parseSessionCookie(rawSession)

  // check if the session is expired
  const isExpired = isSessionExpired(
    session.accessTokenExpires
  )

  // if the session is not expired let the request pass
  if (!isExpired) {
    return NextResponse.next()
  }

  // if the session is expired
  // refresh the token

  try {
    const newSession =
      await refreshTokenSet(
        session.refreshToken
      )

    const resposne = NextResponse.next()
    resposne.cookies.set(
      cookieName,
      JSON.stringify(newSession),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
      }
    )

    return resposne
  } catch {
    return redirectToSignIn(request)
  }
}

function redirectToSignIn(
  request: NextRequest
) {
  const url = new URL(request.url)
  url.pathname = "/signin"

  const response =
    NextResponse.redirect(
      url.toString()
    )

  response.cookies.delete(cookieName)

  return response
}

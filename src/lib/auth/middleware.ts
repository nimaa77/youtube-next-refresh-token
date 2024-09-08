import {
  NextRequest,
  NextResponse,
} from "next/server"

import { cookieName } from "@/lib/auth/storage"

export function middleware(
  request: NextRequest
) {
  const accessToken =
    request.cookies.get(
      cookieName
    )?.value

  if (accessToken) {
    return NextResponse.next()
  }

  const url = new URL(request.url)
  url.pathname = "/signin"
  return NextResponse.redirect(
    url.toString()
  )
}

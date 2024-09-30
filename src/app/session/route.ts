import {
  NextRequest,
  NextResponse,
} from "next/server"

import { cookieName } from "@/lib/auth/storage"
import { parseSessionCookie } from "@/lib/utils"

// create a GET request handler
// this handler will return the session cookie
// if the session cookie is not present
// return a 401 Unauthorized response
export function GET(
  request: NextRequest
) {
  const rawSession =
    request.cookies.get(
      cookieName
    )?.value

  if (!rawSession) {
    return NextResponse.error()
  }

  const session =
    parseSessionCookie(rawSession)

  return NextResponse.json(session)
}

import { cookies } from "next/headers";

export const cookieName = "USER_SESSION";

export function saveSession(accessToken: string) {
  // save the access token in a HTTP-ONLY cookie
}

export function removeSession() {
  // remove the cookie
}

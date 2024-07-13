import "server-only";

import { cookies } from "next/headers";
import { Session } from "./types";
import { cookieName } from "./storage";

const BACKEND_URL = "http://localhost:4000";

export async function getSession(): Promise<Session | null> {
  // get token from cookie
  // get user from /v1/me
  // return the data
  return null;
}

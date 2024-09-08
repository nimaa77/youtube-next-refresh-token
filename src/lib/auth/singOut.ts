"use server"

import "server-only"

import { redirect } from "next/navigation"

import { removeSession } from "./storage"

export async function signOut(options?: {
  redirectTo?: string
}) {
  removeSession()
  redirect(options?.redirectTo ?? "/")
}

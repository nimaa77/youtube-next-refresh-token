"use server";

import "server-only";

import { redirect } from "next/navigation";

import { removeSession } from "./storage";

export async function signOut(options?: { redirectTo?: string }) {
  // clear the cookie
  // redirect the user to the home page
}

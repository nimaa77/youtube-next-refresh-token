"use server";

import "server-only";

import { redirect } from "next/navigation";
import { saveSession } from "./storage";

const BACKEND_URL = "http://localhost:4000";

export async function singIn({
  redirectTo = "/dashboard",
  ...credentials
}: {
  email: string;
  password: string;
  redirectTo?: string;
}) {
  // validate the credentials with the backend
  // if the credentials are valid, save the session
  // and redirect the user to the dashboard
}

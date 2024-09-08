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
  const res = await fetch(`${BACKEND_URL}/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  saveSession(data.accessToken);

  redirect(redirectTo);
}

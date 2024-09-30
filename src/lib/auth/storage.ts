import { cookies } from "next/headers";

export const cookieName = "USER_SESSION";

interface Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
}

export function saveSession(session: Session) {
  cookies().set(cookieName, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeSession() {
  cookies().delete(cookieName);
}

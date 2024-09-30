"use client"

import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react"
import { Session } from "./types"

type SessionProvider =
  | null
  | (Session & {
      updateSession: () => void
    })

export const SessionContext =
  createContext<
    SessionProvider | undefined
  >(undefined)

export function SessionProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  // create a context to store the session
  const [session, setSession] =
    useState(initialSession)

  // implement the updateSession function
  // it should fetch the session from the server
  // and set the session in the context
  // send a GET to /session
  const updateSession =
    useCallback(async () => {
      const res = await fetch(
        "/session"
      )
      const newSession =
        await res.json()

      setSession(newSession)
    }, [])

  // memoize the value of the context
  // so that it only updates when the session or updateSession function changes
  const value = useMemo(() => {
    if (session) {
      return {
        ...session,
        updateSession,
      }
    }
    return null
  }, [session, updateSession])

  return (
    <SessionContext.Provider
      value={value}
    >
      {children}
    </SessionContext.Provider>
  )
}

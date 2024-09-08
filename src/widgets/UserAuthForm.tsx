"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { singIn } from "@/lib/auth/singIn"

export default function UserAuthForm() {
  async function handleSubmit(
    formData: FormData
  ) {
    const email = formData.get(
      "email"
    ) as string
    const password = formData.get(
      "password"
    ) as string

    singIn({
      email,
      password,
    })
  }

  return (
    <div className="grid gap-6">
      <form action={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              className="sr-only"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label
              className="sr-only"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <Button>Sign In</Button>
        </div>
      </form>
    </div>
  )
}

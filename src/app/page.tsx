"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export default function Home() {
  const [name, setName] = useState("") // Adding name state
  const [email, setEmail] = useState("") // Adding email state
  const [password, setPassword] = useState("") // Adding password state

  const {
    data: session,
  } = authClient.useSession()

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div >
    )
  }

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },
      {
        onError: () => window.alert("Something went wrong"),
        onSuccess: () => window.alert("Success")
      })
  }

  const onSignIn = () => {
    authClient.signIn.email({
      email,
      password,
    },
      {
        onError: () => window.alert("Something went wrong"),
        onSuccess: () => window.alert("Success")
      })
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="flex flex-col p-4 gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => onSubmit()}>Create user</Button>
      </div>
      <div className="flex flex-col p-4 gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => onSignIn()}>Login</Button>
      </div>
    </div>
  )
}

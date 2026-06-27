import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Connexion — Cours Particuliers Tunis",
}

export default function LoginPage() {
  return <LoginForm />
}

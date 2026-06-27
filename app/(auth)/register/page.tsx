import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Inscription — Cours Particuliers Tunis",
}

export default function RegisterPage() {
  return <RegisterForm />
}

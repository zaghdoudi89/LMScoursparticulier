import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  if (user.role === "TEACHER") redirect("/dashboard/prof")
  redirect("/dashboard/eleve")
}

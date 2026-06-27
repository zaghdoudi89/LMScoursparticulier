import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { redirect } from "next/navigation"

export default async function EleveDashboardPage() {
  const user = await getCurrentUser()
  if (!user || user.role !== "STUDENT") redirect("/login")

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Tableau de bord — Élève</h1>
      <p className="text-muted-foreground mt-1">Bienvenue, {user.name} !</p>
      <p className="mt-4 text-sm text-muted-foreground">
        La recherche de profs et vos réservations arrivent dans la prochaine phase.
      </p>
    </main>
  )
}

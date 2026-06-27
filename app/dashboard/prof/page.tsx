import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { redirect } from "next/navigation"

export default async function ProfDashboardPage() {
  const user = await getCurrentUser()
  if (!user || user.role !== "TEACHER") redirect("/login")

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Tableau de bord — Professeur</h1>
      <p className="text-muted-foreground mt-1">Bienvenue, {user.name} !</p>
      <p className="mt-4 text-sm text-muted-foreground">
        Les demandes de sessions et l&apos;onboarding arrivent dans la prochaine phase.
      </p>
    </main>
  )
}

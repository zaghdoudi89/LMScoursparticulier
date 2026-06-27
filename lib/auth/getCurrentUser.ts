import { auth } from "@/auth"
import type { Role } from "@prisma/client"

export type CurrentUser = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: Role
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth()
  if (!session?.user?.id) return null
  return session.user as CurrentUser
}

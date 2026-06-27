"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth.schema"

type ActionSuccess = { success: true }
type ActionError = { error: string }
export type RegisterActionResult = ActionSuccess | ActionError

export async function registerAction(
  data: RegisterInput
): Promise<RegisterActionResult> {
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { name, email, password, role } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "Un compte avec cet email existe déjà." }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword, role },
      })

      if (role === "TEACHER") {
        await tx.teacherProfile.create({ data: { userId: user.id } })
      } else {
        await tx.studentProfile.create({ data: { userId: user.id } })
      }
    })
  } catch {
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }

  return { success: true }
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Cours Particuliers Tunis</h1>
      <p className="text-muted-foreground text-lg">Plateforme de mise en relation élèves / professeurs</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          Se connecter
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-md border border-input bg-background font-medium hover:bg-accent transition"
        >
          S&apos;inscrire
        </Link>
        <Link
          href="/profs"
          className="px-4 py-2 rounded-md border border-input bg-background font-medium hover:bg-accent transition"
        >
          Trouver un prof
        </Link>
      </div>
    </main>
  );
}

export default function Home(){
  return (
    <main className="space-y-4">
      <div className="card"><h2 className="text-lg font-semibold">¡Bienvenido! 👋</h2>
      <p className="opacity-80">Ve a <a className="underline" href="/studio">/studio</a> para crear imágenes o videos.</p></div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="card"><b>1)</b> Conecta Neon (DB) y corre Prisma.</div>
        <div className="card"><b>2)</b> Sube a Vercel y configura variables.</div>
        <div className="card"><b>3)</b> Corre el worker (rápido) en tu PC.</div>
      </div>
    </main>
  )
}

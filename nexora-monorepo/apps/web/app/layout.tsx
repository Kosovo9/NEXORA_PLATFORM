import './globals.css'
export const metadata = { title: 'Nexora PRO', description: 'AI Studio Todo-en-Uno' }
export default function RootLayout({ children }: { children: React.ReactNode }){
  return <html lang="es"><body><div className="max-w-6xl mx-auto p-4 space-y-6">
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Nexora — PRO</h1>
      <nav className="flex gap-3 text-sm">
        <a className="underline" href="/">Home</a>
        <a className="underline" href="/studio">Studio</a>
      </nav>
    </header>
    {children}
  </div></body></html>
}

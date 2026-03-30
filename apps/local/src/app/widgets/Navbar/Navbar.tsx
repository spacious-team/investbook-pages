import { ThemeToggle } from '@investbook-pages/common-ui';

export default function Navbar() {
  
  return (
    <nav className="w-full bg-primary text-primary-foreground py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Investbook</h1>
        <ThemeToggle />
      </div>
    </nav>
  )
}
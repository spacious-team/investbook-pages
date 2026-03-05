import * as React from "react"
import { cn } from '../utils'

type SidebarContextProps = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export function SidebarProvider({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className={cn("flex h-screen", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { collapsed } = useSidebar()

  return (
    <div
      className={cn(
        `transition-all duration-300 ${collapsed ? "w-16" : "w-64"} overflow-hidden bg-gray-100 flex flex-col h-full`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-15 bg-gray-300 flex items-center justify-center", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex-1", className)} {...props} />
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <div className={cn("mt-auto", className)} {...props}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 w-full text-left hover:bg-gray-200 flex items-center gap-2"
      >
        <span className="text-lg">{collapsed ? "»" : "«"}</span>
        {!collapsed && <span>Collapse</span>}
      </button>
    </div>
  )
}
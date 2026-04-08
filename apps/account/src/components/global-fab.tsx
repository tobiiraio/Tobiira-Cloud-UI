"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Plus, Building2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GlobalFab() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()

  const orgId = useMemo(() => {
    const id = params?.id
    return typeof id === "string" ? id : id?.[0]
  }, [params])

  const inviteHref = orgId ? `/organizations/${orgId}/invites` : "/organizations"

  if (pathname?.startsWith("/auth")) return null

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col items-end gap-2">
          <Link href="/organizations/new" onClick={() => setOpen(false)}>
            <Button size="pill" className="gap-2 shadow-lg">
              <Building2 className="h-4 w-4" />
              New organization
            </Button>
          </Link>
          <Link href={inviteHref} onClick={() => setOpen(false)}>
            <Button variant="secondary" size="pill" className="gap-2 shadow-lg">
              <UserPlus className="h-4 w-4" />
              Invite member
            </Button>
          </Link>
        </div>
      )}
      <Button
        size="pill"
        className="h-12 w-12 rounded-full p-0 shadow-lg"
        aria-label="Create"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus className={`h-5 w-5 transition ${open ? "rotate-45" : ""}`} />
      </Button>
    </div>
  )
}

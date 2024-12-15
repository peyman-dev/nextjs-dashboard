import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'


export const routing = defineRouting({
    defaultLocale: "en",
    locales: ["en", "fa"],
})

export const { Link, getPathname, permanentRedirect, redirect, usePathname, useRouter } = createNavigation(routing)
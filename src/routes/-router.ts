import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import type { RouterAuthContext } from '../types/auth'

export const router = createRouter({
  routeTree,
  context: {
    session: null,
    loading: true,
  } satisfies RouterAuthContext,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

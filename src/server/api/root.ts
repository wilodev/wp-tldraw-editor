// Este archivo combina todos los routers en un solo router principal
import { editorRouter } from '@/app/server/api/routers/editor'
import { router } from '@/app/server/api/trpc'

/**
 * Router principal de la aplicación
 */
export const appRouter = router({
	editor: editorRouter,
})

export type AppRouter = typeof appRouter

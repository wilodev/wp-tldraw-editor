// Este archivo configura el servidor tRPC
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

/**
 * Contexto para cada petición de tRPC
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		headers: opts.headers,
	}
}

/**
 * Init tRPC
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson, // Permite enviar tipos como Date, Map, Set, etc.
})

export const router = t.router
export const publicProcedure = t.procedure

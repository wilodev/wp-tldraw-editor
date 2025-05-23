// Este archivo configura el manejador HTTP para las peticiones tRPC
import { appRouter } from '@/app/server/api/root'
import { createTRPCContext } from '@/app/server/api/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

/**
 * Manejador HTTP para peticiones tRPC
 * Compatible con Next.js App Router
 */
const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc', // Base URL para todas las peticiones tRPC
		req,
		router: appRouter,
		createContext: () => createTRPCContext({ headers: req.headers }),
	})

// Exportamos el manejador para los métodos GET y POST
export { handler as GET, handler as POST }

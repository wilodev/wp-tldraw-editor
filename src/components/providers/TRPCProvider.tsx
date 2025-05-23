'use client'

// Este componente proporciona el contexto tRPC a toda la aplicación
import { api } from '@/app/lib/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import superjson from 'superjson'

interface TRPCProviderProps {
	children: React.ReactNode
}

/**
 * Proveedor que inicializa tRPC y React Query
 */
export function TRPCProvider({ children }: TRPCProviderProps) {
	// Creamos instancias únicas de QueryClient y trpcClient
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				httpBatchLink({
					url: '/api/trpc',
					transformer: superjson,
				}),
			],
		})
	)

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</api.Provider>
	)
}

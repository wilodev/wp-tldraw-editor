// Configuración del cliente tRPC para el frontend
import { type AppRouter } from '@/app/server/api/root'
import { createTRPCReact } from '@trpc/react-query'

// Creamos el hook para usar tRPC en componentes React
export const api = createTRPCReact<AppRouter>()

/**
 * Función auxiliar para determinar la URL base de la API
 * En desarrollo es localhost, en producción es relativa a la URL actual
 */
export const getBaseUrl = () => {
	if (typeof window !== 'undefined') return '' // En el navegador, URL relativa
	return `http://localhost:${process.env.PORT ?? 3000}` // En el servidor
}

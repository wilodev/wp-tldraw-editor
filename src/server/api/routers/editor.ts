// Este archivo define los endpoints específicos para el editor
import { publicProcedure, router } from '@/app/server/api/trpc'
import { z } from 'zod'

// Datos iniciales (en producción usaríamos una base de datos)
// Esto es solo para demo, en un entorno real usarías una DB persistente
let editorData = {
	shapes: [
		{
			id: '1',
			type: 'rectangle',
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			fill: 'blue',
		},
	],
}

export const editorRouter = router({
	// Endpoint para obtener los datos del editor
	getData: publicProcedure.query(() => {
		return editorData
	}),

	// Endpoint para actualizar los datos del editor
	// Valida la entrada usando Zod
	updateData: publicProcedure
		.input(z.object({ shapes: z.array(z.any()) }))
		.mutation(({ input }) => {
			editorData = input
			return { success: true }
		}),

	// Endpoint para modificar una forma específica
	modifyShape: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ input }) => {
			const { id } = input

			// Buscar la forma en los datos en memoria
			const shapeIndex = editorData.shapes.findIndex(
				(shape) => shape.id === id
			)

			if (shapeIndex === -1) {
				throw new Error('Forma no encontrada')
			}

			// Obtener la forma existente
			const shape = editorData.shapes[shapeIndex]

			// Realizar un cambio visible en la forma
			// Cambiar el color a rojo o a otro color si ya es rojo
			const newFill = shape.fill === 'red' ? 'green' : 'red'

			// Actualizar la forma
			editorData.shapes[shapeIndex] = {
				...shape,
				fill: newFill,
				...(shape.width && { width: shape.width + 20 }),
				...(shape.height && { height: shape.height + 20 }),
			}

			return {
				success: true,
				shape: editorData.shapes[shapeIndex],
				message: `Forma modificada: color cambiado a ${newFill} y tamaño aumentado`,
			}
		}),
})

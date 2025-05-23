// Este archivo define los endpoints específicos para el editor
import { publicProcedure, router } from '@/app/server/api/trpc'
import { z } from 'zod'

// Definir interfaces para los diferentes tipos de formas
interface BaseShape {
	id: string
	type: string
	x: number
	y: number
	parentId?: string
	index?: string
	rotation?: number
	isLocked?: boolean
	opacity?: number
	meta?: Record<string, unknown>
}

interface RectangleShape extends BaseShape {
	type: 'rectangle'
	width: number
	height: number
	fill: string
}

interface GeoShape extends BaseShape {
	type: 'geo'
	props: {
		w: number
		h: number
		geo: string
		color?: string
		fill?: string
		[key: string]: unknown
	}
}

interface DrawShape extends BaseShape {
	type: 'draw'
	props: {
		segments: unknown[]
		color?: string
		fill?: string
		dash?: string
		size?: string
		[key: string]: unknown
	}
}

// Tipo unión para cualquier forma
type Shape =
	| RectangleShape
	| GeoShape
	| DrawShape
	| (BaseShape & Record<string, unknown>)

// Datos iniciales
let editorData: { shapes: Shape[] } = {
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
	updateData: publicProcedure
		.input(z.object({ shapes: z.array(z.unknown()) }))
		.mutation(({ input }) => {
			editorData = {
				shapes: input.shapes.map((shape) => ({
					...(shape as Shape),
				})),
			}
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

			if (shape.type === 'draw') {
				const drawShape = shape as DrawShape
				// Para formas de tipo dibujo, modificamos el color en props
				const currentColor = drawShape.props?.color || 'black'
				const newColor = currentColor === 'red' ? 'blue' : 'red'

				// Actualizar solo la propiedad color manteniendo la estructura
				editorData.shapes[shapeIndex] = {
					...drawShape,
					props: {
						...drawShape.props,
						color: newColor,
					},
				}

				return {
					success: true,
					shape: editorData.shapes[shapeIndex],
					message: `Dibujo modificado: color cambiado a ${newColor}`,
				}
			} else if (shape.type === 'geo') {
				const geoShape = shape as GeoShape
				// Formato nuevo con props
				const currentColor = geoShape.props.color || 'black'
				const newColor = currentColor === 'red' ? 'blue' : 'red'

				editorData.shapes[shapeIndex] = {
					...geoShape,
					props: {
						...geoShape.props,
						color: newColor,
						w: geoShape.props.w
							? geoShape.props.w + 20
							: geoShape.props.w,
						h: geoShape.props.h
							? geoShape.props.h + 20
							: geoShape.props.h,
					},
				}

				return {
					success: true,
					shape: editorData.shapes[shapeIndex],
					message: `Forma modificada: color cambiado y tamaño aumentado`,
				}
			} else if (shape.type === 'rectangle') {
				const rectShape = shape as RectangleShape
				// Formato antiguo (por compatibilidad)
				const newFill = rectShape.fill === 'red' ? 'green' : 'red'

				editorData.shapes[shapeIndex] = {
					...rectShape,
					fill: newFill,
					width: rectShape.width + 20,
					height: rectShape.height + 20,
				}

				return {
					success: true,
					shape: editorData.shapes[shapeIndex],
					message: `Forma modificada: color cambiado y tamaño aumentado`,
				}
			} else {
				return {
					success: false,
					message: `Tipo de forma no soportado: ${shape.type}`,
				}
			}
		}),
})

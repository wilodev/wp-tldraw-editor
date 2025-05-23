export interface BaseShape {
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

export interface RectangleShape extends BaseShape {
	type: 'rectangle'
	width: number
	height: number
	fill: string
}

export interface GeoShape extends BaseShape {
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

export interface DrawShape extends BaseShape {
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
export type Shape =
	| RectangleShape
	| GeoShape
	| DrawShape
	| (BaseShape & Record<string, unknown>)

'use client'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { ErrorState, LoadingState } from '@/app/omponents/editor/EditorStates'
import { Editor as TldrawEditor } from '@tldraw/tldraw'
import { useEffect, useRef, useState } from 'react'
import { EditorControls } from './EditorControls'
import { useEditorApi } from './hooks/useEditorApi'
import { TldrawCanvas } from './TldrawCanvas'
import { DrawShape, GeoShape, RectangleShape } from './types'

export function Editor() {
	// Estado para controlar si el editor está montado
	const [editorMounted, setEditorMounted] = useState(false)

	// Referencia al editor tldraw
	const editorRef = useRef<TldrawEditor | null>(null)

	const {
		editorData,
		isLoading,
		isSaving,
		isModifying,
		error,
		saveEditorData,
		handleModifyShape,
	} = useEditorApi()

	useEffect(() => {
		if (editorRef.current && editorData && editorMounted) {
			console.log('Datos cargados:', editorData)

			try {
				editorRef.current.selectAll()
				const selectedIds = editorRef.current.getSelectedShapeIds()
				editorRef.current.deleteShapes(selectedIds)

				editorData.shapes.forEach((shape) => {
					try {
						if (shape.type === 'rectangle') {
							const rectShape = shape as RectangleShape
							editorRef.current?.createShape({
								type: 'geo',
								x: rectShape.x,
								y: rectShape.y,
								props: {
									w: rectShape.width,
									h: rectShape.height,
									geo: 'rectangle',
									fill: 'solid',
									color: rectShape.fill,
								},
							})
						} else if (shape.type === 'draw') {
							const drawShape = shape as DrawShape
							editorRef.current?.createShape({
								type: 'draw',
								x: drawShape.x,
								y: drawShape.y,
								props: {
									segments: drawShape.props.segments,
									color: drawShape.props.color || 'black',
									fill: drawShape.props.fill || 'none',
									dash: drawShape.props.dash || 'draw',
									size: drawShape.props.size || 'm',
									isComplete: true,
									isClosed: false,
								},
							})
						} else if (shape.type === 'geo') {
							const geoShape = shape as GeoShape
							editorRef.current?.createShape({
								type: 'geo',
								x: geoShape.x,
								y: geoShape.y,
								props: {
									w: geoShape.props.w,
									h: geoShape.props.h,
									geo: geoShape.props.geo,
									color: geoShape.props.color || 'black',
									fill: geoShape.props.fill || 'solid',
								},
							})
						}
					} catch (shapeError) {
						console.error(
							`Error al restaurar forma de tipo ${shape.type}:`,
							shapeError
						)
					}
				})

				console.log('Datos cargados en el editor correctamente')
			} catch (err) {
				console.error('Error al cargar datos en el editor:', err)
			}
		}
	}, [editorData, editorMounted])

	const handleSave = () => saveEditorData(editorRef.current)

	// Mostrar estado de carga
	if (isLoading) {
		return <LoadingState />
	}

	// Mostrar error si ocurre
	if (error) {
		return <ErrorState message={error.message} />
	}

	return (
		<Card className="w-full h-[calc(100vh-6rem)] shadow-lg">
			<CardHeader className="flex flex-row items-center justify-between border-b">
				<CardTitle>Editor TLDraw</CardTitle>
				<EditorControls
					onSave={handleSave}
					onModifyShape={handleModifyShape}
					isSaving={isSaving}
					isModifying={isModifying}
				/>
			</CardHeader>
			<CardContent className="p-0 h-[calc(100%-5rem)]">
				<TldrawCanvas
					onMount={(editor) => {
						editorRef.current = editor
						setEditorMounted(true)
					}}
				/>
			</CardContent>
		</Card>
	)
}

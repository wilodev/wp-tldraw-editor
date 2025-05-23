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

			// Cargar los datos en el editor
			try {
				// Limpiar el canvas actual
				editorRef.current.selectAll()
				const selectedIds = editorRef.current.getSelectedShapeIds()
				editorRef.current.deleteShapes(selectedIds)

				// Crear cada forma recibida del servidor
				editorData.shapes.forEach((shape) => {
					// Creación de formas según su tipo
					if (shape.type === 'rectangle') {
						editorRef.current?.createShape({
							type: 'geo',
							x: shape.x,
							y: shape.y,
							props: {
								w: shape.width,
								h: shape.height,
								geo: 'rectangle',
								fill: shape.fill,
							},
						})
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

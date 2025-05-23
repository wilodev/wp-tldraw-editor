'use client'
import { api } from '@/app/lib/api'
import { Editor as TldrawEditor } from '@tldraw/tldraw'
import { toast } from 'sonner'

export function useEditorApi() {
	const utils = api.useUtils()

	// Consulta para obtener datos del editor
	const { data, isLoading, error } = api.editor.getData.useQuery(undefined, {
		retry: 3,
		refetchInterval: 30000,
	})

	// Mutación para actualizar datos
	const { mutate: updateData, isPending: isSaving } =
		api.editor.updateData.useMutation({
			onSuccess: () => {
				utils.editor.getData.invalidate()
				toast.success('Guardado con éxito', {
					description: 'Los cambios se han guardado correctamente',
				})
			},
			onError: (error) => {
				toast.error('Error al guardar', {
					description: error.message,
				})
			},
		})

	// Mutación para modificar una forma
	const { mutate: modifyShape, isPending: isModifying } =
		api.editor.modifyShape.useMutation({
			onSuccess: () => {
				utils.editor.getData.invalidate()
				toast.success('Forma modificada', {
					description: 'La forma ha sido modificada correctamente',
				})
			},
			onError: (error) => {
				toast.error('Error al modificar', {
					description: error.message,
				})
			},
		})

	// Función para guardar cambios del editor
	const saveEditorData = (editor: TldrawEditor | null) => {
		if (!editor) {
			toast.error('Error', {
				description: 'Editor no inicializado',
			})
			return
		}

		try {
			const shapes = editor.getCurrentPageShapes()

			if (shapes.length === 0) {
				toast.info('Sin contenido', {
					description: 'Dibuja algo antes de guardar',
				})
				return
			}

			updateData({ shapes })
		} catch (err) {
			console.error('Error al guardar datos:', err)
			toast.error('Error', {
				description: 'No se pudieron guardar los datos',
			})
		}
	}

	// Función para modificar una forma
	const handleModifyShape = () => {
		if (data && data.shapes.length > 0) {
			modifyShape({ id: data.shapes[0].id })
		} else {
			toast.info('No hay formas', {
				description: 'Dibuja una forma primero antes de modificar',
			})
		}
	}

	return {
		editorData: data,
		isLoading,
		isSaving,
		isModifying,
		error,
		saveEditorData,
		handleModifyShape,
	}
}

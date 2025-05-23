'use client'

import { Button } from '@/app/components/ui/button'

interface EditorControlsProps {
	onSave: () => void
	onModifyShape: () => void
	isSaving: boolean
	isModifying: boolean
}

export function EditorControls({
	onSave,
	onModifyShape,
	isSaving,
	isModifying,
}: EditorControlsProps) {
	return (
		<div className="flex gap-2">
			<Button
				onClick={onModifyShape}
				disabled={isModifying}
				variant="outline"
			>
				{isModifying ? 'Modificando...' : 'Modificar Forma'}
			</Button>
			<Button onClick={onSave} disabled={isSaving}>
				{isSaving ? 'Guardando...' : 'Guardar Cambios'}
			</Button>
		</div>
	)
}

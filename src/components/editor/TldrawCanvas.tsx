'use client'
import { Tldraw, Editor as TldrawEditor } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useRef } from 'react'

interface TldrawCanvasProps {
	onMount?: (editor: TldrawEditor) => void
	onChange?: () => void
}

export function TldrawCanvas({ onMount, onChange }: TldrawCanvasProps) {
	const editorRef = useRef<TldrawEditor | null>(null)

	const handleMount = (editor: TldrawEditor) => {
		editorRef.current = editor

		if (onChange) {
			editor.store.listen(() => {
				onChange()
			})
		}
		if (onMount) {
			onMount(editor)
		}
	}

	return (
		<div className="h-full w-full">
			<Tldraw onMount={handleMount} />
		</div>
	)
}

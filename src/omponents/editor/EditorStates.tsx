'use client'

interface LoadingStateProps {
	message?: string
}

export function LoadingState({
	message = 'Cargando editor...',
}: LoadingStateProps) {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="text-lg">{message}</div>
		</div>
	)
}

interface ErrorStateProps {
	message: string
}

export function ErrorState({ message }: ErrorStateProps) {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="text-lg text-red-500">
				Error al cargar el editor: {message}
			</div>
		</div>
	)
}

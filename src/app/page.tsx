import { Editor } from '@/app/components/editor/TldrawEditor'

export default function Home() {
	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Wilodev TLDraw Editor</h1>
			<Editor />
		</main>
	)
}

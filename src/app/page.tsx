'use client'
import Rover from '@/src/components/Rover'

export default function Home() {
	return (
		<main className='grid place-content-center h-screen'>
			<div className='flex flex-col gap-6 bg-gray-500 p-6 w-fit rounded-lg'>
				<h1 className='text-lg font-bold border-b-2 pb-2 border-gray-700'>
					Mars Rover Controls
				</h1>
				<h4>Commands: L/R - Rotate 90° | M - Move foward</h4>
				<Rover />
			</div>
		</main>
	)
}

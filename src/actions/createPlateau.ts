export interface Plateau {
	x: number
	y: number
}

export default function createPlateau(x: number, y: number) {
	const plateau: Plateau = {
		x: x,
		y: y,
	}

	return plateau
}

import IPlateau from '../interfaces/plateau'

export default function createPlateau(x: number, y: number) {
	const plateau: IPlateau = {
		x: x,
		y: y,
	}

	return plateau
}

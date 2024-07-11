import IPlateau from '../interfaces/plateau'
import { getPlateauCoordinates } from '../utils/coordinates'

export default function createPlateau(coordinates: string) {
	const plateau: IPlateau = getPlateauCoordinates(coordinates)
	return plateau
}

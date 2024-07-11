import { Coordinates } from '../actions/createRover'

const allowedOrientations = ['N', 'E', 'S', 'W']

export const getLandingCoordinates = (coordinates: string) => {
	const splitedCoordinates = coordinates.split(' ')

	const orientation = splitedCoordinates[2]

	if (
		allowedOrientations.find((allowed) => allowed === orientation) === undefined
	) {
		throw new Error('Incorrect orientation: ' + orientation + ', try: N|E|W|S')
	}

	return {
		x: Number(splitedCoordinates[0]),
		y: Number(splitedCoordinates[1]),
		orientation: orientation,
	}
}

export const getPlateauCoordinates = (coordinates: string) => {
	const splitedCoordinates = coordinates.split(',')

	return {
		x: Number(splitedCoordinates[0]),
		y: Number(splitedCoordinates[1]),
	}
}

export const formatFinalCoordinatesToString = ({
	x,
	y,
	orientation,
}: Coordinates) => {
	return `${x} ${y} ${orientation}`
}

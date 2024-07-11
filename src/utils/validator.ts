import { getLandingCoordinates, getPlateauCoordinates } from './coordinates'

export const validateCommands = (commands: string) => {
	commands = commands.toLowerCase()
	const valid = ['m', 'l', 'r']
	if (commands.split('').every((command) => valid.includes(command))) {
		return
	} else {
		throw new Error('Invalid command')
	}
}

export const validatePosition = (position: string) => {
	if (position.split(' ').length !== 3) {
		throw new Error('Invalid position')
	}
}

export const validateCoordinates = (coordinates: string) => {
	if (coordinates.includes(',')) {
		if (coordinates.split(',').length !== 2) {
			throw new Error('Invalid coordinate, need to follow: number,number')
		}
	} else {
		throw new Error('Invalid coordinate format')
	}
}

export const validatePositionRelatedToPlateau = (
	coordinates: string,
	position: string
) => {
	const formatedRoverPosition = getLandingCoordinates(position)
	const formatedPlateauMaxCoordinates = getPlateauCoordinates(coordinates)

	if (
		formatedRoverPosition.x > formatedPlateauMaxCoordinates.x ||
		formatedRoverPosition.x > formatedPlateauMaxCoordinates.y
	) {
		throw new Error('Rover cant be in a position outside plateau limits')
	}
}

export const validateUserId = (userId: number) => {
	if (userId <= 0) {
		throw new Error('User id need to be greater than 0')
	}
}

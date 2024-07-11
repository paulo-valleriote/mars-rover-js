import { Plateau } from './createPlateau'

export interface Coordinates {
	x: number
	y: number
	orientation: string
}

interface Rover {
	coordinates: Coordinates
	execute: (rover: Rover, commands: string, plateau: Plateau) => Coordinates
	moveForward: (rover: Rover, plateau: Plateau) => void
}

export default function createRover(x: number, y: number, orientation: string) {
	const rover: Rover = {
		coordinates: {
			x: x,
			y: y,
			orientation: orientation,
		},
		execute: execute,
		moveForward: moveForward,
	}

	return rover
}

function execute(rover: Rover, commands: string, plateau: Plateau) {
	const directions = ['N', 'E', 'S', 'W']

	for (let command of commands) {
		switch (command) {
			case 'L':
				rover.coordinates.orientation =
					directions[
						(directions.indexOf(rover.coordinates.orientation) + 3) % 4
					]
				break
			case 'R':
				rover.coordinates.orientation =
					directions[
						(directions.indexOf(rover.coordinates.orientation) + 1) % 4
					]
				break
			case 'M':
				moveForward(rover, plateau)
				break
		}
	}

	return rover.coordinates
}

function moveForward(rover: Rover, plateau: Plateau) {
	switch (rover.coordinates.orientation) {
		case 'N':
			if (rover.coordinates.y + 1 <= plateau.y) rover.coordinates.y += 1
			break
		case 'E':
			if (rover.coordinates.x + 1 <= plateau.x) rover.coordinates.x += 1
			break
		case 'S':
			if (rover.coordinates.y - 1 >= 0) rover.coordinates.y -= 1
			break
		case 'W':
			if (rover.coordinates.x - 1 >= 0) rover.coordinates.x -= 1
			break
	}
}

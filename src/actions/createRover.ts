import IPlateau from '../interfaces/plateau'
import IRover from '../interfaces/rover'

export default function createRover(x: number, y: number, orientation: string) {
	const rover: IRover = {
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

function execute(rover: IRover, commands: string, plateau: IPlateau) {
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

function moveForward(rover: IRover, plateau: IPlateau) {
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

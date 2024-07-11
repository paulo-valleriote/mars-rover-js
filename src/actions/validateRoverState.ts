import IRoverState from '../interfaces/rover/IRoverState'
import {
	validateCommands,
	validateCoordinates,
	validateUserId,
	validatePosition,
	validatePositionRelatedToPlateau,
} from '../utils/validator'

export default function validateRoverState(roverState: IRoverState) {
	validateCommands(roverState.commands)
	validateCoordinates(roverState.plateauMaxCoordinates)
	validateUserId(roverState.userId)
	validatePosition(roverState.landingPosition)
	validatePositionRelatedToPlateau(
		roverState.plateauMaxCoordinates,
		roverState.landingPosition
	)
}

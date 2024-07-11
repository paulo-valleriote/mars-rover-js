'use client'
import { FormEvent, useState } from 'react'
import ControlInput from './ControlInput'
import saveLog from '@/app/actions/saveLog'
import createPlateau from '@/app/actions/createPlateau'
import createRover from '@/app/actions/createRover'
import {
	formatFinalCoordinatesToString,
	getLandingCoordinates,
	getPlateauCoordinates,
} from '@/app/utils/coordinates'
import {
	validateCommands,
	validateCoordinates,
	validatePosition,
	validateUserId,
} from '@/app/utils/validator'

function Rover() {
	const [roverState, setRooverState] = useState({
		userId: 0,
		coordinates: '',
		landingPosition: '',
		commands: '',
	})

	const [display, setDisplay] = useState({
		errorMessage: '',
		positionMessage: '',
		logMessage: '',
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			validateRoverState()

			const { x: plateauX, y: plateauY } = getPlateauCoordinates(
				roverState.coordinates
			)
			const plateau = createPlateau(plateauX, plateauY)

			const {
				x: roverX,
				y: roverY,
				orientation: roverOrientation,
			} = getLandingCoordinates(roverState.landingPosition)
			const rover = createRover(roverX, roverY, roverOrientation)

			const finalCoordinates = rover.execute(
				rover,
				roverState.commands,
				plateau
			)

			const formatedFinalCoordinates =
				formatFinalCoordinatesToString(finalCoordinates)

			const result = await saveLog({
				userId: roverState.userId,
				initialCoordinates: roverState.landingPosition,
				finalCoordinates: formatedFinalCoordinates,
				commands: roverState.commands,
			})

			setDisplay({
				positionMessage: 'Rover moved to: ' + formatedFinalCoordinates,
				logMessage: result.message,
				errorMessage: '',
			})
			setRooverState({
				userId: 0,
				commands: '',
				coordinates: '',
				landingPosition: '',
			})
		} catch (error) {
			setDisplay({ ...display, errorMessage: (error as Error).message })
		}
	}

	const validateRoverState = () => {
		validateCommands(roverState.commands)
		validateCoordinates(roverState.coordinates)
		validateUserId(roverState.userId)
		validatePosition(roverState.landingPosition)
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-2 justify-center items-center'
			>
				<ControlInput
					label='User ID'
					inputValue={roverState.userId}
					onChangeHandler={(e) =>
						setRooverState({ ...roverState, userId: Number(e.target.value) })
					}
				/>
				<ControlInput
					label='Upper-right Coordinates'
					inputValue={roverState.coordinates}
					onChangeHandler={(e) =>
						setRooverState({ ...roverState, coordinates: e.target.value })
					}
					placeholder='Exemple: 3,3'
				/>
				<ControlInput
					label='Current Position'
					inputValue={roverState.landingPosition}
					onChangeHandler={(e) =>
						setRooverState({ ...roverState, landingPosition: e.target.value })
					}
					placeholder='Exemple: 1 2 N'
				/>
				<ControlInput
					label='Commands'
					inputValue={roverState.commands}
					onChangeHandler={(e) =>
						setRooverState({ ...roverState, commands: e.target.value })
					}
					placeholder='Exemple: LMMR'
				/>
				<button
					type='submit'
					className='w-fit mt-4  py-1 px-3 bg-gray-200 text-black font-bold rounded-md'
				>
					Send Commands
				</button>
			</form>
			{display.errorMessage && (
				<div className='w-full text-center text-red-300'>
					{display.errorMessage}
				</div>
			)}
			{display.positionMessage && (
				<div className='w-full text-center'>{display.positionMessage}</div>
			)}
			{display.logMessage && (
				<div className='w-full text-center'>{display.logMessage}</div>
			)}
		</>
	)
}

export default Rover

'use client'
import { FormEvent, useState } from 'react'
import ControlInput from './ControlInput'
import saveLog from '@/src/actions/saveLog'
import createPlateau from '@/src/actions/createPlateau'
import createRover from '@/src/actions/createRover'
import { formatFinalCoordinatesToString } from '@/src/utils/coordinates'
import ILogPostResponse from '../interfaces/log/http/ILogPostResponse'
import IRoverState from '../interfaces/rover/IRoverState'
import validateRoverState from '../actions/validateRoverState'

function Rover() {
	const [roverState, setRoverState] = useState<IRoverState>({
		userId: 0,
		plateauMaxCoordinates: '',
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
			validateRoverState(roverState)

			const plateau = createPlateau(roverState.plateauMaxCoordinates)
			const rover = createRover(roverState.landingPosition)

			const finalCoordinates = rover.execute(
				rover,
				roverState.commands,
				plateau
			)

			const formatedFinalCoordinates =
				formatFinalCoordinatesToString(finalCoordinates)

			const result: ILogPostResponse = await saveLog({
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
			setRoverState({
				userId: 0,
				commands: '',
				plateauMaxCoordinates: '',
				landingPosition: '',
			})
		} catch (error) {
			setDisplay({
				positionMessage: '',
				logMessage: '',
				errorMessage: (error as Error).message,
			})
		}
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
						setRoverState({ ...roverState, userId: Number(e.target.value) })
					}
				/>
				<ControlInput
					label='Upper-right Coordinates'
					inputValue={roverState.plateauMaxCoordinates}
					onChangeHandler={(e) =>
						setRoverState({
							...roverState,
							plateauMaxCoordinates: e.target.value,
						})
					}
					placeholder='Exemple: 3,3'
				/>
				<ControlInput
					label='Current Position'
					inputValue={roverState.landingPosition}
					onChangeHandler={(e) =>
						setRoverState({ ...roverState, landingPosition: e.target.value })
					}
					placeholder='Exemple: 1 2 N'
				/>
				<ControlInput
					label='Commands'
					inputValue={roverState.commands}
					onChangeHandler={(e) =>
						setRoverState({ ...roverState, commands: e.target.value })
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

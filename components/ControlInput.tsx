import { ChangeEventHandler } from 'react'

interface ControlInputProps {
	label: string
	placeholder?: string
	inputValue: string | number
	onChangeHandler: ChangeEventHandler<HTMLInputElement>
}
function ControlInput(props: ControlInputProps) {
	return (
		<div className='flex w-full justify-between gap-2'>
			<label>{props.label}:</label>
			<input
				type='text'
				value={props.inputValue}
				onChange={props.onChangeHandler}
				placeholder={props.placeholder && props.placeholder}
				className='text-black w-32 px-2 rounded-sm'
			/>
		</div>
	)
}

export default ControlInput

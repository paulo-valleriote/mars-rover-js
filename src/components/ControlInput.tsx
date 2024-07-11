import IControlInputProps from '../interfaces/components/IControlInputProps'

function ControlInput(props: IControlInputProps) {
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

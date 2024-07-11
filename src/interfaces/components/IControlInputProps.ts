import { ChangeEventHandler } from 'react'

export default interface IControlInputProps {
	label: string
	placeholder?: string
	inputValue: string | number
	onChangeHandler: ChangeEventHandler<HTMLInputElement>
}

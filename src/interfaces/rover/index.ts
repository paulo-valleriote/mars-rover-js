import ICoordinates from '../coordinates'
import IPlateau from '../plateau'

export default interface IRover {
	coordinates: ICoordinates
	execute: (rover: IRover, commands: string, plateau: IPlateau) => ICoordinates
	moveForward: (rover: IRover, plateau: IPlateau) => void
}

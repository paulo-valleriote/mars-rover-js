export interface Log {
	userId: number
	initialCoordinates: string
	finalCoordinates: string
	commands: string
}

const saveLog = async (log: Log) => {
	const response = await fetch('/api/log', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(log),
	})

	return response.json()
}

export default saveLog

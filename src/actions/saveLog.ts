import ILog from '../interfaces/log'

const saveLog = async (log: ILog) => {
	const response = await fetch('/api/log', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(log),
	})

	return response.json()
}

export default saveLog

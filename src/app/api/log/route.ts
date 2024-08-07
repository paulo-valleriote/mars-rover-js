import ILogPostRequest from '@/src/interfaces/log/http/ILogPostRequest'
import prisma from '@/src/lib/prisma'

export async function POST(req: Request): Promise<Response> {
	const body: ILogPostRequest = await req.json()
	const { userId, initialCoordinates, finalCoordinates, commands } = body

	const savedLog = await prisma.log.create({
		data: {
			user_id: userId,
			landing_coordinates: initialCoordinates,
			final_coordinates: finalCoordinates,
			commands: commands,
		},
	})

	return Response.json({
		message: `Command logged successfully, ID ${savedLog.id}`,
	})
}

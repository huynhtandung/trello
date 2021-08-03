import { CLIENT_URL, PORT } from '@environments'
import { corsMiddleware, errorsMiddleware } from '@middlewares'
import { BoardRouter, TemplateRouter, UserRouter } from '@routers'
import { connectMongodb } from '@utils'
import express, { Application } from 'express'
import http from 'http'
import { handleListenSocket } from './socket'
import { Server } from 'socket.io'
import { SOCKET_INSTANCE } from '@constants'

const app: Application = express()
const httpServer = http.createServer(app)

app.use(express.json())
app.use(corsMiddleware)
app.use('/users', UserRouter)
app.use('/templates', TemplateRouter)
app.use('/boards', BoardRouter)
app.use(errorsMiddleware)

httpServer.listen(PORT, () => {
	console.log('- Server is running!')
	connectMongodb()
})

const io = new Server(httpServer, {
	cors: {
		origin: CLIENT_URL
	}
})
app.set(SOCKET_INSTANCE, io)
handleListenSocket(io)

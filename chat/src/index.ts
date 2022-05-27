import express, { Application, Request, Response, NextFunction } from 'express'
import { Server } from 'socket.io'
import corsMiddleware from 'cors'

const app: Application = express()
const port = 9000

app.use(corsMiddleware)

app.use('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send({ message: 'Testing root' })
})

const expressServer = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
)

const io = new Server(expressServer, { cors: { origin: '*' } })

io.on('connection', socket => {
  socket.emit('messageFromServer', {
    message: 'This is a message from the server',
  })
  socket.on('messageFromClient', messageFromClient => {
    console.log(messageFromClient)
  })
})

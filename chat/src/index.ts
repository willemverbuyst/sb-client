import express, { Application, Request, Response, NextFunction } from 'express'
import { Server } from 'socket.io'

const app: Application = express()
const port = 9000

app.use('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send({ message: 'Testing root' })
})

const expressServer = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
)

const io = new Server(expressServer)

io.on('connection', socket => {
  socket.emit('messageFromServer', {
    message: 'This is comming from the server',
  })
  socket.on('messageFromClient', messageFromClient => {
    console.log(messageFromClient)
  })
})

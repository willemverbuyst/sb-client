import express, { Application, Request, Response, NextFunction } from 'express'
import { Server } from 'socket.io'
import corsMiddleware from 'cors'
import namespaces from './data/namespaces'
import { Room } from 'classes/Room'
import { Namespace } from 'classes/Namespace'

const app: Application = express()
const port = 9000

app.use(corsMiddleware())

app.use(express.static(__dirname + '/public'))

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
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

  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    }
  })
  socket.emit('nsList', nsData)
})

namespaces.forEach((namespace: Namespace) => {
  io.of(namespace.endpoint).on('connection', nsSocket => {
    console.log(nsSocket.handshake)
    const username = nsSocket.handshake.query.username

    nsSocket.emit('nsRoomLoad', namespace.rooms)
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      const roomToLeave = Object.keys(nsSocket.rooms)[1]
      nsSocket.leave(roomToLeave)
      updateUsersInRoom(namespace, roomToLeave)
      nsSocket.join(roomToJoin)

      const nsRoom = namespace.rooms.find((room: Room) => {
        return room.roomTitle === roomToJoin
      })
      nsRoom && nsSocket.emit('historyCatchUp', nsRoom.history)
      updateUsersInRoom(namespace, roomToJoin)
    })
    nsSocket.on('newMessageToServer', msg => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: 'https://via.placeholder.com/30',
      }

      const roomTitle = Object.keys(nsSocket.rooms)[1]

      const nsRoom = namespace.rooms.find((room: Room) => {
        return room.roomTitle === roomTitle
      })
      nsRoom && nsRoom.addMessage(fullMsg)
      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
    })
  })
})

function updateUsersInRoom(namespace: Namespace, roomToJoin: any) {
  io.of(namespace.endpoint)
    .in(roomToJoin)
    // @ts-ignore
    .clients((error, clients) => {
      io.of(namespace.endpoint)
        .in(roomToJoin)
        .emit('updateMembers', clients.length)
    })
}

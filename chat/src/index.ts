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

// loop through each namespace and listen for a connection
namespaces.forEach((namespace: any) => {
  // console.log(namespace)
  // const thisNs = io.of(namespace.endpoint)
  io.of(namespace.endpoint).on('connection', nsSocket => {
    console.log(nsSocket.handshake)
    const username = nsSocket.handshake.query.username
    // console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
    // a socket has connected to one of our chatgroup namespaces.
    // send that ns gorup info back
    nsSocket.emit('nsRoomLoad', namespace.rooms)
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      // deal with history... once we have it
      console.log(nsSocket.rooms)
      const roomToLeave = Object.keys(nsSocket.rooms)[1]
      nsSocket.leave(roomToLeave)
      updateUsersInRoom(namespace, roomToLeave)
      nsSocket.join(roomToJoin)
      // io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
      //     console.log(clients.length)
      //     numberOfUsersCallback(clients.length);
      // })
      const nsRoom = namespace.rooms.find((room: Room) => {
        return room.roomTitle === roomToJoin
      })
      nsSocket.emit('historyCatchUp', nsRoom.history)
      updateUsersInRoom(namespace, roomToJoin)
    })
    nsSocket.on('newMessageToServer', msg => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: 'https://via.placeholder.com/30',
      }
      // console.log(fullMsg)
      // Send this message to ALL the sockets that are in the room that THIS socket is in.
      // how can we find out what rooms THIS socket is in?
      // console.log(nsSocket.rooms)
      // the user will be in the 2nd room in the object list
      // this is because the socket ALWAYS joins its own room on connection
      // get the keys
      const roomTitle = Object.keys(nsSocket.rooms)[1]
      // we need to find the Room object for this room
      const nsRoom = namespace.rooms.find((room: Room) => {
        return room.roomTitle === roomTitle
      })
      // console.log("The room object that we made that matches this NS room is...")
      // console.log(nsRoom)
      nsRoom.addMessage(fullMsg)
      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
    })
  })
})

function updateUsersInRoom(namespace: Namespace, roomToJoin: any) {
  // Send back the number of users in this room to ALL sockets connected to this room
  io.of(namespace.endpoint)
    .in(roomToJoin)
    // @ts-ignore
    .clients((error, clients) => {
      // console.log(`There are ${clients.length} in this room`);
      io.of(namespace.endpoint)
        .in(roomToJoin)
        .emit('updateMembers', clients.length)
    })
}

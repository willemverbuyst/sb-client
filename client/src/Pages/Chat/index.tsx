import { Box, Grid } from '@material-ui/core'
import React, { useState, useEffect, ReactElement } from 'react'
import socketIOClient from 'socket.io-client'
import PageTitle from '../../Components/Title/PageTitle'
import './styles.css'

const ENDPOINT = 'http://127.0.0.1:9000'

interface Room {
  roomId: number
  roomTitle: string
  namespace: string
  privateRoom: boolean
  history: Array<{ [key: string]: number | string }>
}

interface Namespace {
  id: number
  img: string
  nsTitle: string
  endpoint: string
  rooms: Array<Room>
}

const Chat: React.FC = (): ReactElement => {
  const [response, setResponse] = useState('')
  const [listOfNamespaces, setListOfNamespaces] = useState<Array<Namespace>>([])
  const [listOfRooms, setListOfRooms] = useState<Array<Room>>([])

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('messageFromServer', (data) => {
      setResponse(data.message)
    })
    socket.emit('messageFromClient', {
      message: 'This is a message from the client',
    })

    socket.on('nsList', (list) => {
      setListOfNamespaces(list)
    })

    const nsSocket = socketIOClient(`${ENDPOINT}/linux`)
    nsSocket.on('nsRoomLoad', (rooms) => setListOfRooms(rooms))
  }, [])

  const selectNamespace = (endpoint: string) => {
    console.log('event', endpoint)
  }

  return (
    <Box>
      <PageTitle title="Chat" color="secondary" />
      <p>Message: {response}</p>

      <Grid container spacing={2}>
        <Grid item xs={1} className="namespaces">
          {listOfNamespaces.map(({ img, endpoint }) => (
            <button
              type="button"
              className="namespaces"
              id={endpoint}
              onClick={() => selectNamespace(endpoint)}
            >
              <img alt="logo" src={img} />
            </button>
          ))}
        </Grid>
        <Grid item xs={2} className="rooms">
          <h3>Rooms</h3>
          <ul className="room-list">
            {listOfRooms.map(({ roomTitle }) => (
              <li>{roomTitle}</li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={9} className="chat-panel">
          <div className="room-header row col-6">
            <div>
              <span className="curr-room-text">Current Room</span>
              <span className="curr-room-num-users">
                Users <span className="glyphicon glyphicon-user" />
              </span>
            </div>
            <div>
              <span className="glyphicon glyphicon-search" />
              <input type="text" id="search-box" placeholder="Search" />
            </div>
          </div>
          <div className="message-form">
            <form id="user-input">
              <div>
                <input
                  id="user-message"
                  type="text"
                  placeholder="Enter your message"
                />
              </div>
            </form>
          </div>

          <div className="message-form">
            <form id="user-input">
              <div>
                <input
                  id="user-message"
                  type="text"
                  placeholder="Enter your message"
                />
              </div>
            </form>
          </div>

          <ul id="messages">
            <li>
              <div className="user-image">
                <img alt="placeholder" src="https://via.placeholder.com/30" />
              </div>
              <div className="user-message">
                <div className="user-name-time">
                  rbunch <span>1:25 pm</span>
                </div>
                <div className="message-text">I went running today.</div>
              </div>
            </li>

            <li>
              <div className="user-image">
                <img alt="placeholder" src="https://via.placeholder.com/30" />
              </div>
              <div className="user-message">
                <div className="user-name-time">
                  rbunch <span>2:25 pm</span>
                </div>
                <div className="message-text">
                  I am getting my tires changed this afternoon.
                </div>
              </div>
            </li>
            <li>
              <div className="user-image">
                <img alt="placeholder" src="https://via.placeholder.com/30" />
              </div>
              <div className="user-message">
                <div className="user-name-time">
                  rbunch <span>2:29 pm</span>
                </div>
                <div className="message-text">I like history.</div>
              </div>
            </li>
            <li>
              <div className="user-image">
                <img alt="placeholder" src="https://via.placeholder.com/30" />
              </div>
              <div className="user-message">
                <div className="user-name-time">
                  rbunch <span>2:59 pm</span>
                </div>
                <div className="message-text">What day is tomorrow?.</div>
              </div>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Chat

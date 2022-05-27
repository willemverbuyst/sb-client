import { Box } from '@material-ui/core'
import React, { useState, useEffect, ReactElement } from 'react'
import socketIOClient from 'socket.io-client'
import PageTitle from '../../Components/Title/PageTitle'

const ENDPOINT = 'http://127.0.0.1:9000'

const Chat: React.FC = (): ReactElement => {
  const [response, setResponse] = useState('')

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('messageFromServer', (data) => {
      setResponse(data.message)
    })
    socket.emit('messageFromClient', {
      message: 'This is a message from the client',
    })
  }, [])

  return (
    <Box>
      <PageTitle title="Chat" color="secondary" />
      <p>Message: {response}</p>
    </Box>
  )
}

export default Chat

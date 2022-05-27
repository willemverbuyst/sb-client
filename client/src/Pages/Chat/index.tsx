import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

// import { useHistory } from 'react-router-dom'

import PageTitle from '../../Components/Title/PageTitle'

const Chat: React.FC = (): ReactElement => {
  // const history = useHistory()

  // useEffect(() => {
  //   if (token) history.push('/programma')
  // }, [token, history])
  // }

  return (
    <Box>
      <PageTitle title="Chat" color="secondary" />
    </Box>
  )
}

export default Chat

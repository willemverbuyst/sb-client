import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProgressComponent from '../../Components/Progress'
import PageTitle from '../../Components/Title/PageTitle'
import { selectAppLoading } from '../../store/appState/selectors'
import { selectToken } from '../../store/user/selectors'
import LoginForm from './LoginForm'

const Login: React.FC = (): ReactElement => {
  const history = useHistory()
  const token = useSelector(selectToken)
  const isLoading = useSelector(selectAppLoading)

  useEffect(() => {
    if (token) history.push('/programma')
  }, [token, history])

  return (
    <Box>
      <PageTitle title="Login" color="secondary" />
      {isLoading ? <ProgressComponent /> : <LoginForm />}
    </Box>
  )
}

export default Login

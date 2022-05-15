import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import ProgressComponent from '../../Components/Progress'
import PageTitle from '../../Components/Title/PageTitle'
import { selectAppLoading } from '../../store/appState/selectors'
import SendEmailForm from './SendEmailForm'

const ForgotPassword: React.FC = (): ReactElement => {
  const isLoading = useSelector(selectAppLoading)

  return (
    <Box>
      <PageTitle
        title="Forgot Password? Too bad, game over!!"
        color="secondary"
      />
      {isLoading ? (
        <ProgressComponent loadingText="Sending email..." />
      ) : (
        <SendEmailForm />
      )}
    </Box>
  )
}

export default ForgotPassword

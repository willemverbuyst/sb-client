import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import EditPasswordForm from './EditPasswordForm'

const EditPassword: React.FC = (): ReactElement => {
  const isLoading = useSelector(selectAppLoading)

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Password" color="primary" />
          {isLoading ? <ProgressComponent /> : <EditPasswordForm />}
        </Box>
      }
    />
  )
}

export default EditPassword

import { Box } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

import PageTitle from '../Title/PageTitle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
)

interface IProps {
  loadingText?: string
}

const ProgressComponent: React.FC<IProps> = ({
  loadingText = '',
}: IProps): ReactElement => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <PageTitle title={loadingText} color="secondary" />
      <LinearProgress color="secondary" />
      <LinearProgress color="primary" />
    </Box>
  )
}

export default ProgressComponent

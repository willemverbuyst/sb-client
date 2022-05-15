import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}))

type IProps = {
  message: string
}

const MessageComponent: React.FC<IProps> = ({
  message,
}: IProps): ReactElement => {
  const classes = useStyles()

  return (
    <Grid>
      <Typography variant="overline" className={classes.message}>
        {message}
      </Typography>
    </Grid>
  )
}

export default MessageComponent

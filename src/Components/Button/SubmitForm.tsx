import { Button, Grid } from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IProps {
  caption: string
  color: 'primary' | 'secondary'
}

const SubmitForm: React.FC<IProps> = ({
  caption,
  color,
}: IProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Grid>
      <Button
        type="submit"
        fullWidth
        className={classes.submit}
        variant={btnVariant ? 'contained' : 'outlined'}
        color={color}
        disableElevation
      >
        {caption}
      </Button>
    </Grid>
  )
}

export default SubmitForm

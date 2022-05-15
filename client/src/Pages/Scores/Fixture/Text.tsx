import {
  Grid,
  GridJustification,
  GridSize,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      margin: '0.5rem',
    },
  },
}))

interface IProps {
  xs: GridSize
  sm: GridSize
  content: string
  justify: GridJustification
}

const TextComponent: React.FC<IProps> = ({
  xs,
  sm,
  content,
  justify,
}: IProps): ReactElement => {
  const classes = useStyles()
  return (
    <Grid item xs={xs} sm={sm} container justify={justify} alignItems="center">
      <Typography variant="h4" className={classes.text}>
        {content}
      </Typography>
    </Grid>
  )
}

export default TextComponent

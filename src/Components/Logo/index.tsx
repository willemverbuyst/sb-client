import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

export const useStyles = makeStyles(() => ({
  small: {
    height: 20,
    width: 20,
    objectFit: 'contain',
  },
  medium: {
    height: 40,
    width: 40,
    objectFit: 'contain',
  },
}))

interface IProps {
  alt: string
  source: string
  size: 'small' | 'medium'
}

const LogoComponent: React.FC<IProps> = ({
  alt,
  source,
  size,
}: IProps): ReactElement => {
  const classes = useStyles()
  const className = size === 'small' ? classes.small : classes.medium

  return (
    <Grid item xs={1} container justify="center" alignItems="center">
      <img className={className} alt={alt} src={source} />
    </Grid>
  )
}

export default LogoComponent

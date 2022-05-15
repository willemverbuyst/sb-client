import { Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles(() => ({
  chip: {
    position: 'absolute',
    right: 5,
    top: 5,
    transform: 'rotate(12deg)',
    color: '#c5c5c5',
    border: 'none',
  },
}))

interface IProps {
  score: string
}

const ChipComponent: React.FC<IProps> = ({ score }: IProps): ReactElement => {
  const classes = useStyles()

  return (
    <Chip
      size="small"
      className={classes.chip}
      label={`${score} pt.`}
      variant="outlined"
    />
  )
}

export default ChipComponent

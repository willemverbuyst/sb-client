import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

export const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

interface IProps {
  icon: JSX.Element
}

const AvatarIconComponent: React.FC<IProps> = ({
  icon,
}: IProps): ReactElement => {
  const classes = useStyles()

  return <Avatar className={classes.avatar}>{icon}</Avatar>
}

export default AvatarIconComponent

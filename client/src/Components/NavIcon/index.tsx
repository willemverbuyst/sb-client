import { IconButton } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface IProps {
  label: string
  goto: () => void
  icon: ReactElement
}

const NavIcon: React.FC<IProps> = ({
  label,
  goto,
  icon,
}: IProps): ReactElement => (
  <IconButton edge="start" color="inherit" aria-label={label} onClick={goto}>
    {icon}
  </IconButton>
)

export default NavIcon

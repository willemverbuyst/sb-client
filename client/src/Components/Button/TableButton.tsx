import { Button } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface IProps {
  caption: string
  color: 'primary' | 'secondary'
  handleClick: () => void
}

const TableButton: React.FC<IProps> = ({
  caption,
  color,
  handleClick,
}: IProps): ReactElement => (
  <Button size="small" variant="text" color={color} onClick={handleClick}>
    {caption}
  </Button>
)

export default TableButton

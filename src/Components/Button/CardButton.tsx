import { Button, Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface IProps {
  caption: string
  color: 'primary' | 'secondary'
  handleClick: () => void
  variant?: 'contained' | 'text' | 'outlined'
}

const CardButton: React.FC<IProps> = ({
  caption,
  color,
  handleClick,
  variant = 'contained',
}: IProps): ReactElement => (
  <Grid item xs={2} container justify="center">
    <Button
      variant={variant}
      size="small"
      color={color}
      disableElevation
      onClick={handleClick}
    >
      {caption}
    </Button>
  </Grid>
)

export default CardButton

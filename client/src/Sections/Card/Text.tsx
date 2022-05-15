import {
  Grid,
  GridJustification,
  GridSize,
  Typography,
} from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import React, { ReactElement } from 'react'

interface IProps {
  xs: GridSize
  content: string
  justify: GridJustification
  variant?: 'inherit' | Variant | undefined
  color?:
    | 'inherit'
    | 'initial'
    | 'textSecondary'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'error'
    | undefined
}

const TextComponent: React.FC<IProps> = ({
  xs,
  content,
  justify,
  variant = 'inherit',
  color = 'inherit',
}: IProps): ReactElement => (
  <Grid item xs={xs} container justify={justify} alignItems="center">
    <Typography variant={variant} color={color}>
      {content}
    </Typography>
  </Grid>
)

export default TextComponent

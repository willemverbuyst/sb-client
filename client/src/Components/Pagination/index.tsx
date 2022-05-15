import { Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Pagination from '@material-ui/lab/Pagination'
import React, { ReactElement } from 'react'

interface IProps {
  label: string
  page: number
  count: number
  color: 'primary' | 'secondary' | 'standard'
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const PaginationComponent: React.FC<IProps> = ({
  label,
  page,
  count,
  color,
  onChange,
}: IProps): ReactElement => {
  const theme = useTheme()
  const pagVariant = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="overline" gutterBottom>
            {label}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Pagination
            size={pagVariant ? 'small' : 'medium'}
            page={page}
            count={count}
            color={color}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PaginationComponent

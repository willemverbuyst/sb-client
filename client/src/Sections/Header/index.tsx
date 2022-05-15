import { Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { selectToken } from '../../store/user/selectors'
import Brand from './Brand'
import NavIcons from './NavIcons'

const Header: React.FC = (): ReactElement => {
  const token = useSelector(selectToken)

  return (
    <Grid container justify="center">
      {token ? <NavIcons /> : <Brand />}
    </Grid>
  )
}

export default Header

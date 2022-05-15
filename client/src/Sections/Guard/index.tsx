import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { selectToken } from '../../store/user/selectors'

interface IProps {
  content: JSX.Element
}

const Guard: React.FC<IProps> = ({ content }: IProps): ReactElement | null => {
  const history = useHistory()
  const token = useSelector(selectToken)

  useEffect(() => {
    if (!token) history.push('/login')
  }, [token])

  return <Box>{token ? content : null}</Box>
}

export default Guard

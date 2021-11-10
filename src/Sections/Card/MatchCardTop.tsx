import React, { ReactElement } from 'react'

import * as UTILS from '../../utils'
import TextComponent from './Text'

interface IProps {
  eventTimeStamp: number
}

const MatchCardTop: React.FC<IProps> = ({
  eventTimeStamp,
}: IProps): ReactElement => (
  <TextComponent
    xs={12}
    justify="center"
    content={UTILS.formatTimeStampToLocalDate(eventTimeStamp)}
    variant="overline"
    color="textSecondary"
  />
)

export default MatchCardTop

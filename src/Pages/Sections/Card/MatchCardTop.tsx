import React, { ReactElement } from 'react';

import { formatTimeStampToLocalDate } from '../../../utils/timeFunctions';
import TextComponent from './Text';

interface IProps {
  eventTimeStamp: number;
}

const MatchCardTop: React.FC<IProps> = ({ eventTimeStamp }: IProps): ReactElement => {
  return (
    <TextComponent
      xs={12}
      justify="center"
      content={formatTimeStampToLocalDate(eventTimeStamp)}
      variant="overline"
      color="textSecondary"
    />
  );
};

export default MatchCardTop;

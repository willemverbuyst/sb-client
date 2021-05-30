import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';

interface IProps {
  content: JSX.Element;
}

const PageContent: React.FC<IProps> = ({ content }: IProps): ReactElement => {
  const isLoading = useSelector(selectAppLoading);

  return <Box>{isLoading ? <ProgressComponent /> : content}</Box>;
};

export default PageContent;

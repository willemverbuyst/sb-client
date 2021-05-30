import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { selectToken } from '../../../store/user/selectors';
import CheckLoginStatus from '../../../utils/Auth/checkLoginStatus';

interface IProps {
  loadingText: string;
  content: JSX.Element;
}

const PageContent: React.FC<IProps> = ({ loadingText, content }: IProps): ReactElement => {
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);

  return (
    <Box>{isLoading ? <ProgressComponent loadingText={loadingText} /> : token ? content : <CheckLoginStatus />}</Box>
  );
};

export default PageContent;

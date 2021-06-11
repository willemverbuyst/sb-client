import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { selectToken } from '../../../store/user/selectors';

interface IProps {
  loadingText: string;
  content: JSX.Element;
}

const PageContent: React.FC<IProps> = ({ loadingText, content }: IProps): ReactElement => {
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  return <Box>{isLoading ? <ProgressComponent loadingText={loadingText} /> : content}</Box>;
};

export default PageContent;

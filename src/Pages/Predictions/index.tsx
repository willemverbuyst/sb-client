import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Message from '../../Components/Message';
import ProgressComponent from '../../Components/Progress';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchAllFixtures } from '../../store/predictions/actions';
import { selectFixtures } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import FixturesSection from './FixturesSection';
import PaginationSection from './PaginationSection';
import TopSection from './TopSection';

const Predictions: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fixtures = useSelector(selectFixtures);
  const isLoading = useSelector(selectAppLoading);
  const token = useSelector(selectToken);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  return (
    <Box>
      <TopSection ronde={ronde} />

      {isLoading ? (
        <ProgressComponent />
      ) : fixtures ? (
        <>
          <FixturesSection fixtures={fixtures} totoronde={totoronde} ronde={ronde} />
          <PaginationSection totoronde={totoronde} ronde={ronde} />
        </>
      ) : (
        <Message message={`Geen voorspellingen gevonden`} />
      )}
    </Box>
  );
};

export default Predictions;

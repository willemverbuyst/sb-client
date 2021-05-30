import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import { fetchCurrentRound } from '../../store/predictions/actions';
import { selectCurrentRound } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import PageContent from '../Sections/PageContent';
import FixturesSection from './FixturesSection';

const Program: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentRound = useSelector(selectCurrentRound);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!currentRound) {
      dispatch(fetchCurrentRound());
    }
  }, [dispatch, currentRound]);

  return (
    <PageContent
      content={
        currentRound ? (
          <>
            <PageHeaderWithoutButton title="Programma" />
            <FixturesSection currentRound={currentRound} />
          </>
        ) : (
          <MessageComponent message={`Er staan voor deze week geen wedstrijden gepland.`} />
        )
      }
    />
  );
};

export default Program;

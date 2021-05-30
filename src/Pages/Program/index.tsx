import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import { fetchCurrentRound } from '../../store/predictions/action-creators';
import { selectCurrentRound } from '../../store/predictions/selectors';
import PageContent from '../Sections/PageContent';
import FixturesSection from './FixturesSection';

const Program: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const currentRound = useSelector(selectCurrentRound);

  useEffect(() => {
    if (!currentRound) {
      dispatch(fetchCurrentRound());
    }
  }, [dispatch, currentRound]);

  return (
    <PageContent
      loadingText="Programma"
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

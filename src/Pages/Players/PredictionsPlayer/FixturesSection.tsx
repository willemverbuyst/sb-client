import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import MatchCard from '../../../Components/Card/MatchCard';
import { IPlayerProfile } from '../../../models/player.model';
import { content } from '../../../ui/sharedClasses';
import { calculateIndex, roundByTotoRound, totoRoundByRound } from '../../../utils/parameterFunctions';
import Pagination from '../../Sections/Pagination';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
}));

interface IProps {
  playerProfile: IPlayerProfile;
  totoronde: string;
  ronde: string;
  id: string;
}

const FixturesSection: React.FC<IProps> = ({ playerProfile, totoronde, ronde, id }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  let t = Number(totoronde);
  let r = Number(ronde);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    r = roundByTotoRound(value);
    history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    t = totoRoundByRound(value);

    history.push(`/spelers/${id}/voorspellingen/${t}/${value}`);
  };

  return (
    <>
      <Grid item xs={12} container justify="center" className={classes.content}>
        {playerProfile.pastFixturesWithScores
          ? [...playerProfile.pastFixturesWithScores[t - 1][calculateIndex(r)]]
              .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
              .map((wedstrijd, i) => (
                <Grid item key={i} lg={4} md={6} xs={12}>
                  <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="public" />
                </Grid>
              ))
          : null}
      </Grid>
      {playerProfile.pastFixturesWithScores ? (
        <Pagination
          totoRound={totoronde}
          round={ronde}
          countTotoRound={playerProfile.pastFixturesWithScores.length}
          countRound={playerProfile.pastFixturesWithScores.flat().length}
          handleChangeRounds={handleChangeRounds}
          handleChangeTotoRounds={handleChangeTotoRounds}
        />
      ) : null}
    </>
  );
};

export default FixturesSection;

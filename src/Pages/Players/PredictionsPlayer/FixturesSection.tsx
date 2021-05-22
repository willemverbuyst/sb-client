import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import MatchCard from '../../../Components/Card/MatchCard';
import PaginationComponent from '../../../Components/Pagination';
import { IPlayerProfile } from '../../../models/player.model';
import { content, pagination } from '../../../ui/sharedClasses';
import { calculateIndex, roundByTotoRound, totoRoundByRound } from '../../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
  ...pagination(theme),
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

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = roundByTotoRound(value);
    history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
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
        <Grid className={classes.pagination}>
          <PaginationComponent
            label="Totoronde"
            page={t}
            count={playerProfile.pastFixturesWithScores.length}
            color="primary"
            onChange={handleChangeTotoRounds}
          />
          <PaginationComponent
            label="Speelronde"
            page={r}
            count={playerProfile.pastFixturesWithScores.flat().length}
            color="secondary"
            onChange={handleChangeRounds}
          />
        </Grid>
      ) : null}
    </>
  );
};

export default FixturesSection;

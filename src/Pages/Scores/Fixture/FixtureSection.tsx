import { Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import AvatarMediumComponent from '../../../Components/Avatar/AvatarMedium';
import { IFixture } from '../../../models/toto.models';
import { timeStampFormattedToLocalDate } from '../../../utils/timeFunctions';
import TextComponent from './Text';

const useStyles = makeStyles((theme: Theme) => ({
  fixture: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    marginBottom: theme.spacing(6),
  },
  date: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  fixture: IFixture;
}

const FixtureSection: React.FC<IProps> = ({ fixture }: IProps): ReactElement => {
  const classes = useStyles();
  const {
    eventTimeStamp,
    homeTeamName,
    homeTeamLogo,
    goalsHomeTeam,
    goalsAwayTeam,
    awayTeamName,
    awayTeamLogo,
  } = fixture;
  const formattedDate = timeStampFormattedToLocalDate(eventTimeStamp);

  return (
    <Grid className={classes.fixture}>
      <Grid item xs={12} container justify="center" className={classes.date}>
        <Typography variant="overline">{formattedDate}</Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
        <TextComponent xs={3} sm={3} content={homeTeamName} justify="flex-end" />
        <AvatarMediumComponent alt={homeTeamName} source={homeTeamLogo} />
        <TextComponent xs={3} sm={1} content={`${goalsHomeTeam} - ${goalsAwayTeam}`} justify="center" />
        <AvatarMediumComponent alt={awayTeamName} source={awayTeamLogo} />
        <TextComponent xs={3} sm={3} content={awayTeamName} justify="flex-start" />
      </Grid>
    </Grid>
  );
};

export default FixtureSection;

import { Avatar, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { FixtureWithScores } from '../../../store/scores/types';
import { timeStampFormattedToLocalDate } from '../../../utils/timeFunctions';

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
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      margin: '0.5rem',
    },
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.8)',
    },
  },
}));

interface IProps {
  fixture: FixtureWithScores;
}

const FixtureSection: React.FC<IProps> = ({ fixture }: IProps): ReactElement => {
  const classes = useStyles();
  return (
    <Grid className={classes.fixture}>
      <Grid item xs={12} container justify="center" className={classes.date}>
        <Typography variant="overline">{timeStampFormattedToLocalDate(fixture.fixture.eventTimeStamp)}</Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Grid item xs={3} container justify="flex-end" alignItems="center">
          <Typography variant="h4" className={classes.text} style={{ textAlign: 'right' }}>
            {fixture.fixture.homeTeamName}
          </Typography>
        </Grid>

        <Grid item xs={1} container justify="center" alignItems="center">
          <Avatar alt={fixture.fixture.homeTeamName} src={fixture.fixture.homeTeamLogo} className={classes.avatar} />
        </Grid>
        <Grid item xs={2} sm={1} container justify="center" alignItems="center">
          <Typography variant="h4" className={classes.text}>
            {fixture.fixture.goalsHomeTeam} - {fixture.fixture.goalsAwayTeam}
          </Typography>
        </Grid>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Avatar alt={fixture.fixture.awayTeamName} src={fixture.fixture.awayTeamLogo} className={classes.avatar} />
        </Grid>

        <Grid item xs={3} container justify="flex-start" alignItems="center">
          <Typography variant="h4" className={classes.text}>
            {fixture.fixture.awayTeamName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FixtureSection;

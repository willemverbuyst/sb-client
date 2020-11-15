import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { selectUser } from '../../store/user/selectors';
import { StringDecoder } from 'string_decoder';

const useStyles = makeStyles(() => ({
  displayName: {
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontSize: '5rem',
    marginLeft: '-2rem'
  }
}));

const replaceUnderScore = (name: string): string => name.replace('_', ' ')

export default function UserDisplay() {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <Box className={classes.displayName}>
      {user ? replaceUnderScore(user.userName) : null}
    </Box>
  )
}

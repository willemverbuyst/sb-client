import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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

export default function UserDisplay() {
  const classes = useStyles();

  return (
    <Box className={classes.displayName}>
      UserName
    </Box>
  )
}

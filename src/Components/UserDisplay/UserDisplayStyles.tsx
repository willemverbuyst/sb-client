import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    marginLeft: '1rem',
  },
  userName: {
    [theme.breakpoints.down('sm')]: {
      writingMode: 'horizontal-tb',
      justifyContent: 'center',
      fontSize: '2.5rem',
      marginTop: theme.spacing(2),
    },
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontSize: '5rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#fff',
  },
  team: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
    marginTop: theme.spacing(5),
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      transform: 'none',
    },
    transform: 'scale(1.5)',
    border: '2px solid #fff',
    backgroundColor: '#fff',
  },
}));

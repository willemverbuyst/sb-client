import { Theme } from '@material-ui/core';

import { IBreadCrumbs, IContent, IPagination, IWaitMessage } from './styles.models';

export const breadCrumbs = (theme: Theme): IBreadCrumbs => ({
  breadCrumbs: {
    marginTop: theme.spacing(6),
  },
});

export const content = (theme: Theme): IContent => ({
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
});

export const pagination = (theme: Theme): IPagination => ({
  pagination: {
    marginBottom: theme.spacing(2),
  },
});

export const waitMessage = (theme: Theme): IWaitMessage => ({
  waitMessage: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: '1rem',
    },
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
});

import { Theme } from '@material-ui/core';
import {
  IBreadCrumbs,
  IContent,
  IDivider,
  IMessage,
  IPagination,
  IProgress,
  ISubTitle,
  ISubTitleSection,
  ITitle,
  ITopSection,
  IWaitMessage,
} from './ISharedClasses';

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

export const divider = (theme: Theme): IDivider => ({
  divider: {
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
    },
    marginBottom: theme.spacing(6),
  },
});

export const message = (theme: Theme): IMessage => ({
  message: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
});

export const pagination = (theme: Theme): IPagination => ({
  pagination: {
    marginBottom: theme.spacing(2),
  },
});

export const progress = (): IProgress => ({
  progress: {
    width: '100%',
  },
});

export const subTitle = (theme: Theme): ISubTitle => ({
  subTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      opacity: '0.7',
    },
  },
});

export const subTitleSection = (theme: Theme): ISubTitleSection => ({
  subTitleSection: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    marginBottom: theme.spacing(6),
  },
});

export const title = (theme: Theme): ITitle => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: '2.5rem',
    },
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
});

export const topSection = (theme: Theme): ITopSection => ({
  topSection: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    justifyContent: 'space-between',
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

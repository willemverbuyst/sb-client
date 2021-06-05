import { Theme } from '@material-ui/core';

import { ClassProperties } from './styles.models';

interface IContent {
  content: ClassProperties;
}

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

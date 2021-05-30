import { Theme } from '@material-ui/core';

import { ClassProperties } from '../../ui/styles.models';

export interface ITopSection {
  topSection: ClassProperties;
}

export const topSection = (theme: Theme): ITopSection => ({
  topSection: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    justifyContent: 'space-between',
  },
});

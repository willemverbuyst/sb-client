import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import ButtonComponent from '../../../Components/Button';
import PageTitleComponent from '../../../Components/Title/PageTitle';
import { topSection } from '../../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  displayButton: boolean;
  update: boolean;
  editAdminStatus: () => void;
}

const TopSection: React.FC<IProps> = ({ displayButton, update, editAdminStatus }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Spelers" />

      {displayButton ? (
        <ButtonComponent caption={update ? 'KLAAR' : 'EDIT SPELER'} color="secondary" handleClick={editAdminStatus} />
      ) : null}
    </Grid>
  );
};

export default TopSection;

import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import ButtonComponent from '../../Components/Button';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  caption: string;
  handleEditProfile: () => void;
}

const TopSection: React.FC<IProps> = ({ caption, handleEditProfile }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Profiel" />
      <ButtonComponent caption={caption} color="secondary" handleClick={handleEditProfile} />
    </Grid>
  );
};
export default TopSection;

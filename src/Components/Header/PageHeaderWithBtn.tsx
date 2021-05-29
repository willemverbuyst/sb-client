import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { topSection } from '../../ui/sharedClasses';
import ButtonComponent from '../Button/Button';
import PageTitleComponent from '../Title/PageTitle';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  title: string;
  captionBtn: string;
  colorBtn: 'primary' | 'secondary';
  handleClick: () => void;
}

const PageHeaderWithButton: React.FC<IProps> = ({ title, captionBtn, colorBtn, handleClick }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text={title} />
      <ButtonComponent caption={captionBtn} color={colorBtn} handleClick={handleClick} />
    </Grid>
  );
};

export default PageHeaderWithButton;

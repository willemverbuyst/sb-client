import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Props = {
  label: string;
  page: number;
  count: number;
  color: 'primary' | 'secondary' | 'standard';
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationComponent: React.FC<Props> = (props: Props): ReactElement => {
  const theme = useTheme();
  const pagVariant = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="overline" gutterBottom>
            {props.label}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Pagination
            size={pagVariant ? 'small' : 'medium'}
            page={props.page}
            count={props.count}
            color={props.color}
            onChange={props.onChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaginationComponent;

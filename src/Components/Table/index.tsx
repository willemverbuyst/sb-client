import { Grid, Table, TableContainer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(6),
  },
}));

type IProps = {
  tableHeaders: ReactElement;
  tableContent: ReactElement;
  dialog: ReactElement | null;
};

const TableComponent: React.FC<IProps> = ({ tableHeaders, tableContent, dialog }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={10} className={classes.table}>
        <TableContainer>
          <Table aria-label="simple table">
            {tableHeaders}
            {tableContent}
          </Table>
        </TableContainer>
      </Grid>
      {dialog}
    </Grid>
  );
};

export default TableComponent;
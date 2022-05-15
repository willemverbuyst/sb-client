import { Grid, Table, TableContainer } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    marginTop: theme.spacing(2),
  },
}))

type IProps = {
  tableHeaders: ReactElement
  tableContent: ReactElement
}

const TableComponent: React.FC<IProps> = ({
  tableHeaders,
  tableContent,
}: IProps): ReactElement => {
  const classes = useStyles()

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
    </Grid>
  )
}

export default TableComponent

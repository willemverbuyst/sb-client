import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  totoRonde: string,
  score: number,
) {
  return {
    totoRonde,
    score,
    history: [
      { date: '2020-01-05', homeTeam: 'Ajax', awayTeam: 'VVV', result: '1-3' },
      { date: '2020-01-02', homeTeam: 'NAC', awayTeam: 'Twente', result: '5-3' },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.totoRonde}
        </TableCell>
        <TableCell align="right">{row.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Ronde
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {/* <TableRow>
                    <TableCell>Datum</TableCell>
                    <TableCell>Thuis Team</TableCell>
                    <TableCell>Uit Team</TableCell>
                    <TableCell align="right">Uitslag</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.homeTeam}</TableCell>
                      <TableCell>{historyRow.awayTeam}</TableCell>
                      <TableCell align="right">{historyRow.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Totoronde 1', 159),
  createData('Totoronde 2', 237),
  createData('Totoronde 3', 262),
  createData('Totoronde 4', 305),
];

export default function PublicProfileTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Totoronde</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
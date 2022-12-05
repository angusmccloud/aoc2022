import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import { Navigation } from '../../containers';

const HomePage = () => {
  return (
    <div>
      <Navigation pageName='Home'>
        <Typography variant='h5'>
          Welcome to Advent of Code 2022, by Connor Tyrrell
        </Typography>
        <Typography variant='h6'>
          Let's see how far I get this year! Only 8 days last year...
        </Typography>
      </Navigation>
      {DatesTable()}
    </div>
  );
}

export default HomePage;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 0,
  },
  tableWrapper: {
    marginLeft: 25,
    marginRight: 25,
  }
});

const DatesTable = () => {
  // console.log('-- DatesTable --');
  const classes = useStyles();

  // Update this row as I do a new day
  const completedDates = 5;
  let dateRows = [];
  for(let i = 1; i <= completedDates; i++) {
    dateRows.push(
      <StyledTableRow key={`date-${i}`}>
        <StyledTableCell align='center'><Typography>{`Day ${i}`}</Typography></StyledTableCell>
        <StyledTableCell align='center'>
          <Link to={`/${i}/1`}>
            <Typography>
              Task 1
            </Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell align='center'>
          <Link to={`/${i}/2`}>
            <Typography>
              Task 2
            </Typography>
          </Link>
        </StyledTableCell>
      </StyledTableRow>
    );
  }

  return (
    <div className={classes.tableWrapper}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'><Typography>Day</Typography></StyledTableCell>
              <StyledTableCell align='center'><Typography>Task 1</Typography></StyledTableCell>
              <StyledTableCell align='center'><Typography>Task 2</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateRows}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
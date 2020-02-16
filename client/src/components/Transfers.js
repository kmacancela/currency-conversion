import React, {useContext} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import AuthContext from "../context/Auth/auth";

// Generate Order Data
function createData(id, date, name, amount) {
  return { id, date, name, amount };
}

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Transfers(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  let rows = [];
  // setTimeout(() => {
    console.log('works?', props.transfers)
    if(props.transfers === null) {
      rows = [[createData(0, '15 Mar, 2019', 'Elvis Presley', 312.44),
              createData(1, '15 Mar, 2019', 'Paul McCartney', 866.99)]]
    } else {
      rows = props.transfers.map(transfer => {
        console.log('transfer', transfer)
        return createData(transfer.id, '16 Mar, 2019', transfer.receiver, transfer.amount)
      })
    }
    console.log('new rows array', rows)
  // }, 1500)

  return (
    <React.Fragment>
      <Title>Transfers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>From</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

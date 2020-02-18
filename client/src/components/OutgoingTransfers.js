import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function createData(id, date, name, amount) {
  return { id, date, name, amount };
}

export default function OutgoingTransfers(props) {
  const [outgoing, setOutgoing] = useState(null)
  let rows = []

  setTimeout(() => {
    if(props.transfers !== null){
      let outgoingWithoutMine = props.transfers.filter(transfer => {
        return transfer.receiver.id !== props.account.id
      })
      rows = outgoingWithoutMine.map(transfer => {
        return createData(transfer.id, '10-11-10', transfer.receiver.email, transfer.amount)
      })


      setOutgoing(rows)
    }
  }, 1000)

  return (
    <React.Fragment>
      <Title>Outgoing Transfers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outgoing?
            outgoing.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))
          :
            null
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

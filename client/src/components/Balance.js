import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Balance(props) {
  return (
    <React.Fragment>
      <Title>Current Balance</Title>
      <Typography component="p" variant="h4">
        {props.account ? "$" + parseFloat(props.account.balance).toFixed(2) + " " + props.account.currency : null}
      </Typography>
      <Typography color="textSecondary" >
        <Link color="secondary" href="#" onClick={() => {props.setFundView(true)}}>
          Add or Send Funds
        </Link>
      </Typography>
    </React.Fragment>
  );
}

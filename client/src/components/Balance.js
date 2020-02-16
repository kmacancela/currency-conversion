import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const timestamp = Date.now();

export default function Balance(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Current Balance</Title>
      <Typography component="p" variant="h4">
        {props.account ? props.account.balance : null}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {props.account ? props.account.updated_at : null}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Add funds
        </Link>
      </div>
    </React.Fragment>
  );
}

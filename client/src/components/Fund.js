import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const timestamp = Date.now();

export default function Fund(props) {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false)
  const [complete, setComplete] = useState(false)

  const addFunds = () => {
    let newBalance = parseFloat(props.account.balance) + parseFloat(amount)
    console.log('newBalance', newBalance)
    fetch(`http://localhost:3000/accounts/${props.account.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ balance: newBalance })
    })
    .then(r => r.json())
    .then(res => {
      console.log('inside addFunds 2', res);
      localStorage.setItem('account', JSON.stringify(res));
      props.setAccount(res);
      setComplete(true);
      setTimeout(() => {
        props.setFundView(false);
      }, 1000)
    })
  }

  const sendFunds = async () => {
    console.log('inside sendFunds')
    let receiver = null;
    console.log('amount', amount)
    let sendAmount = parseFloat(amount).toFixed(2)
    console.log('sendAmount', sendAmount)
    await fetch("http://localhost:3000/accounts")
    .then(r => r.json())
    .then(res => {
      // console.log('finding account', res)
      receiver = res.filter(account => {
        return account.email === email
      })[0]
      console.log('receiver 1', receiver)
    })
    // console.log('account', props.account, props.account.id)
    console.log('receiver 2', receiver)
    let updatedReceiver = {
      id: receiver.id,
      first_name: receiver.first_name,
      last_name: receiver.last_name,
      email: receiver.email,
      password_digest: receiver.password_digest,
      balance: receiver.balance,
      currency: receiver.currency
    }
    console.log('new receiver', updatedReceiver)

    fetch("http://localhost:3000/transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ sender: receiver, receiver, amount: sendAmount })
    })
    .then(r => r.json())
    .then(res => {
      console.log('res', res)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(send) {
      sendFunds();
    } else {
      addFunds();
    }
  }

  return (
    <React.Fragment>
      <Title>Add/Send Funds</Title>
      <Typography component="p" variant="h4">
        {
          complete ?
            <>Successfully completed!</>
          :
            <>0</>
        }
      </Typography>
      <hr />
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        {
          send ?
          <>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Link color="primary" href="#" onClick={() => {setSend(false)}}>
            Switch to adding fund to yourself.
          </Link>
          </>
          :
          <span>
            Adding funds to yourself.<br/>
            <Link color="primary" href="#" onClick={() => {setSend(true)}}>
              Send to someone else instead?
            </Link>
          </span>
        }
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="amount"
          label="Enter Amount"
          type="number"
          id="amount"
          autoComplete="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {send ?
            <>Send Funds</>
            :
            <>Add Funds</>
          }
        </Button>
      </form>
      <br />
      <div>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {props.setFundView(false)}}
        >
          Cancel
        </Button>
      </div>
    </React.Fragment>
  );
}

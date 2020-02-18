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
  const [error, setError] = useState(false)

  const addFunds = (account) => {
    let newBalance = parseFloat(account.balance) + parseFloat(amount)
    console.log('newBalance', newBalance)
    fetch(`http://localhost:3000/accounts/${account.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ balance: newBalance })
    })
    .then(r => r.json())
    .then(res => {
      localStorage.setItem('account', JSON.stringify(res));
      if(props.account === account){
          props.setAccount(res);
          fetch("http://localhost:3000/transfers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({ sender_id: account.id, receiver_id: account.id, amount: parseFloat(amount) })
          })
      }
      setComplete(true);
      setTimeout(() => {
        props.setFundView(false);
      }, 1000)
    })
  }

  const removeFunds = () => {
    let newBalance = parseFloat(props.account.balance) - parseFloat(amount)
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
      localStorage.setItem('account', JSON.stringify(res));
      console.log('res', res)
      props.setAccount(res);
      // setComplete(true);
    })
  }

  const sendFunds = async () => {
    let receiver = null;
    let sendAmount = parseFloat(amount).toFixed(2)
    console.log('inside send funds', sendAmount, props.account.balance, sendAmount < props.account.balance)
    if(sendAmount < props.account.balance) {
      setError(false);
      await fetch("http://localhost:3000/accounts")
      .then(r => r.json())
      .then(res => {
        receiver = res.filter(account => {
          return account.email === email
        })[0]
        addFunds(receiver);
      })
      fetch("http://localhost:3000/transfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ sender_id: props.account.id, receiver_id: receiver.id, amount: sendAmount })
      })
      .then(r => r.json())
      .then(res => {
        removeFunds();
        console.log('res sender', res.sender)
        setComplete(true);
      })
    } else {
      setError(true);
    }
    setTimeout(() => {
      props.setFundView(false);
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(send) {
      sendFunds();
    } else {
      addFunds(props.account);
    }
  }

  const makeTest = () => {
    fetch("http://localhost:3000/transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ sender_id: 1, receiver_id: 2, amount: 110 })
    })
    .then(r => r.json())
    .then(res => {
      console.log('res', res)
    })
  }

  return (
    <React.Fragment>
      <Title>Add/Send Funds</Title>
      <Typography component="p" variant="h4">
        {
          complete ?
            <>Successfully completed!</>
          :
            null
        }
        {
          error ?
            <>Not enough funds!</>
          :
            null
        }
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        {
          send ?
          <>
          <Link color="primary" href="#" onClick={() => {setSend(false)}}>
            Switch to adding fund to yourself.
          </Link>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
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
          label="Amount"
          type="number"
          id="amount"
          autoComplete="amount"
          autoFocus
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

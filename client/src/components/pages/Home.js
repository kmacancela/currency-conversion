import React, {useState, useContext, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import Balance from '../Balance';
import Fund from '../Fund';
import OutgoingTransfers from '../OutgoingTransfers';
import IncomingTransfers from '../IncomingTransfers';
import AuthContext from "../../context/Auth/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      {new Date().getFullYear()}
      {' Karina Macancela'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
}));

export default function Home() {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [account, setAccount] = useState(null)
  const [outgoing, setOutgoing] = useState(null)
  const [incoming, setIncoming] = useState(null)
  const [fundView, setFundView] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      let currentAccount = JSON.parse(localStorage.getItem('account'))
      setAccount(currentAccount)
    }, 100)
  }, []);

  useEffect(() => {
    if(account){
      console.log('account', account.balance)
      let accountId = account.id
      fetch(`http://localhost:3000/accounts/${accountId}`)
        .then(r => r.json())
        .then(res => {
          setIncoming(res.incoming_transfers);
          setOutgoing(res.outgoing_transfers);
        })
    }
  }, [account])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const logout = () => {
    context.logout()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" >
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {account ? <>Welcome, {account.first_name}!</> : null}
          </Typography>
          <button onClick={logout}>Log out</button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
              {
                fundView ?
                  <Fund account={account} setAccount={setAccount} setFundView={setFundView} />
                  :
                  <Balance account={account} setFundView={setFundView}/>
              }
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <OutgoingTransfers transfers={outgoing} account={account} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <IncomingTransfers transfers={incoming} account={account} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

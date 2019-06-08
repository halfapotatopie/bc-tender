import React from "react";
import Header from "./layout/Header";
import HomeComponent from "./HomeComponent";
import SubmitBidComponent from "./SubmitBidComponent";
import RevealBidComponent from "./RevealBidComponent";
import ViewResultComponent from "./ViewResultComponent";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Flame from '@material-ui/icons/Whatshot';

function MadeWithLove() {
  return (
    <Typography variant="body2">
      {'Powered by '}
      <Link color="inherit" href="https://www.ethereum.org" target="_blank">
        Ethereum
      </Link>
      {' 2019 '}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({

  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    maxHeight: '15vh',
    backgroundColor: '#FAFAFA',
  }, 

}));

function MyComponent() {

  const classes = useStyles();

    return(

      <div className="App" style={{backgroundColor:'#eceff1'}}>
        <CssBaseline>
          <Header />
          <BrowserRouter>
            <Route exact path="/" component = {HomeComponent} />
            <Route exact path="/bid" component = {SubmitBidComponent} />
            <Route exact path="/reveal" component = {RevealBidComponent}/>
            <Route exact path="/result" component = {ViewResultComponent}/>
          </BrowserRouter>
          <footer className={classes.footer}>
            <Container maxWidth="sm">
              <Typography variant="h6">Blockchain Tender App <Flame/></Typography>
              <MadeWithLove />
            </Container>
          </footer>
        </CssBaseline>
      </div>
    )
}

export default MyComponent;

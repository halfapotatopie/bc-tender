import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ResultIcon from '@material-ui/icons/ListAlt';
import SubmitIcon from '@material-ui/icons/Send';
import "./Header.css"

function findTabValue() {
  if (window.location.href.indexOf("/bid") > -1) {
    return 0;
  } else if (window.location.href.indexOf("/reveal") > -1) {
    return 1;
  } else if (window.location.href.indexOf("/result") > -1) {
    return 2;
  } else {
    return -1;
  }
}

function Header() {
    return (
        <BrowserRouter>
            <div>
                <AppBar component="div" className="secondaryBar" position="static" elevation={0}>
                    <Route path="/"
                        render={({ location }) => (
                            <Fragment>
                                <Tabs value={findTabValue()}>
                                    <Tab icon={<MoneyIcon/>} className="tab" label="Submit Bid" href="/bid" />
                                    <Tab icon={<SubmitIcon/>} className="tab" label="Reveal Bid" href="/reveal" />
                                    <Tab icon={<ResultIcon/>} className="tab" label="View Result" href="/result" />
                                </Tabs>
                            </Fragment>
                        )}
                    />
                </AppBar>

            </div>
        </BrowserRouter>
    )
}

export default Header;

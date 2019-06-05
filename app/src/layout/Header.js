import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ResultIcon from '@material-ui/icons/ListAlt';
import SubmitIcon from '@material-ui/icons/Send';
import "./Header.css"

function Header() {
    return (
        <BrowserRouter>
            <div>
                <AppBar position='static' className="bar">
                    <Toolbar>
                    {/* name + logo (do later) */}
                    <Typography variant="h5" className="title">
                        Drizzle Tender App
                    </Typography>
                    </Toolbar>
                </AppBar>

                {/* tabs for submit bid, submit nounce, reveal results */}
                <AppBar component="div" className="secondaryBar" position="static" elevation={0}>
                    <Route path="/"
                        render={({ location }) => (
                            <Fragment>
                                <Tabs value={location.pathname}>
                                    <Tab icon={<MoneyIcon/>} className="tab" label="Submit Bid" href="/bid" />
                                    <Tab icon={<SubmitIcon/>} className="tab" label="Reveal Bid" href="/reveal" />
                                    <Tab icon={<ResultIcon/>} className="tab" label="View Result" href="/result" >
                                    </Tab>
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

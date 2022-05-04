import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AnalogWatch from './AnalogWatch';
import Md5Salaus from './Md5Salaus';
import NWCustomerFetch from './NWCustomerFetch';
import TypicodeFetch from './TypicodeFetch';
import Viestit from './Viestit';
import LoginsFetch from './LoginFetch';
import NWProductsFetch from './NWProductsFetch';


class Navigaatio extends Component {
    render() {
        return (
            <Router>
                <div className="Navigation">
                    <h2> Nortwind react appi 2020</h2>
                    <nav className="navbar navbar-expand-1g navbar-light bg-dark">
                        <ul className="nav">
                            <li><Link to={'/'} className="nav-link"> Home</Link></li>
                            <li><Link to={'/NWCustomerFetch'} className="nav-link">NWCustomerFetch</Link></li>
                            <li><Link to={'/NWProductsFetch'} className="nav-link">Products</Link></li>
                            <li><Link to={'/LoginsFetch'} className="nav-link"> Logins</Link></li>
                            <li><Link to={'/TypicodeFetch'} className="nav-link">TypicodeFetch</Link></li>
                            <li><Link to={'/Viestit'} className="nav-link">Viestit</Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route exact path='/' component={AnalogWatch} />
                        <Route exact path='/NWCustomerFetch' component={NWCustomerFetch} />
                        <Route exact path='/NWProductsFetch' component= {NWProductsFetch} />
                        <Route exact path='/LoginsFetch' component={LoginsFetch} />
                        <Route exact path='/TypicodeFetch' component={TypicodeFetch} />
                        <Route exact path='/Viestit' component={Viestit} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navigaatio;
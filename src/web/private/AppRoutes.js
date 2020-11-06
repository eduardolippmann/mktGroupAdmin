import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Layout from "./components/Layout"
import CreateGroup from "./components/CreateGroup.jsx"
import ListGroups from "./components/ListGroups.jsx"
import DiscountPage from "./components/DiscountSubscription.jsx"

class AppRoutes extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/createGroup" exact>
                        <Layout><CreateGroup /></Layout>
                    </Route>
                    <Route path="/listGroups" exact>
                        <Layout><ListGroups /></Layout>
                    </Route>

                    {/* This page would probably be hosted from elsewhere */}
                    <Route path="/discountPage/:id" exact>
                        <DiscountPage ></DiscountPage>
                    </Route>
                    
                    <Route >
                        <Layout><ListGroups /></Layout>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default AppRoutes;
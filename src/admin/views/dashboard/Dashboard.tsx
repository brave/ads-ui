import React, { Component } from 'react';

import Overview from "./views/overview/Overview";
import Server from "./views/server/Server";
import Users from "./views/users/Users";
import Campaigns from "./views/campaigns/Campaigns";

import { Redirect, Route, Switch, Link } from "react-router-dom";
import TabSelector from '../../../components/tabSelector/TabSelector';

class Dashboard extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { match } = this.props;

        const tabConfig = [
            { label: "Overview", selected: this.props.location.pathname === this.props.match.url + "/overview", link: this.props.match.url + "/overview" },
            { label: "Users", selected: this.props.location.pathname === this.props.match.url + "/users", link: this.props.match.url + "/users" },
            { label: "Campaign", selected: this.props.location.pathname === this.props.match.url + "/campaigns", link: this.props.match.url + "/campaigns" },
            { label: "Server", selected: this.props.location.pathname === this.props.match.url + "/server", link: this.props.match.url + "/server" }
        ]

        return (
            <React.Fragment>
                <TabSelector config={tabConfig} />
                <Switch>
                    <Route path={match.url + "/overview"} component={Overview} />
                    <Route path={match.url + "/users"} component={Users} />
                    <Route path={match.url + "/campaigns"} component={Campaigns} />
                    <Route path={match.url + "/server"} component={Server} />
                    <Redirect to={match.url + "/overview"} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Dashboard;
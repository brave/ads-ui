import React, { Component } from 'react';

import UserView from "../../../../../../containers/Users/UserView/UserView";
import AdvertiserNew from "../../../../../../components/Advertisers/AdvertiserNew/AdvertiserNew";
import { Redirect, Route, Switch } from "react-router-dom";

class User extends Component<any, any> {
    render() {
        const { match } = this.props;
        return (
            <div>
                <UserView match={match} />
                <Switch>
                    <Route exact path={match.url + "/advertiser/new"} component={AdvertiserNew} />
                </Switch >
            </div>
        );
    }
}

export default User;
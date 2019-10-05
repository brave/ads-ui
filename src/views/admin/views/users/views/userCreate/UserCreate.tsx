import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import UserNew from "../../../../../../components/Users/UserNew/UserNew";

class UserCreate extends Component<any, any> {
    render() {
        const { classes, create, auth, history, match } = this.props;
        return (
            <div>
                <Switch>
                    <Route exact path={match.url} component={UserNew} />
                </Switch >
            </div>
        );
    }
}

export default UserCreate;
import React, { Component } from 'react';
import * as S from "./TabSelector.style";
import { Redirect, Route, Switch, Link } from "react-router-dom";

const linkStyle = { textDecoration: "none", color: "inherit" };

class TabSelector extends Component<any, any> {
    render() {
        const { config } = this.props;
        const tabs = config.map((item) => {
            return (
                <Link style={linkStyle} to={item.link}>
                    <S.Tab selected={item.selected}>
                        {item.label}
                    </S.Tab>
                </Link>
            )
        })

        return (
            <S.Container>
                {tabs}
            </S.Container>
        );
    }
}

export default TabSelector;
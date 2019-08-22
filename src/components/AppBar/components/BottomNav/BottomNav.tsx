import { Icon, IconButton, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import * as S from "./BottomNav.style";

class BottomNav extends React.Component {
    public render() {
        return (
            <S.Container>
                <S.InnerContainer>
                    <S.Nav>
                        <S.InnerNav>
                            <S.NavIcon>
                                <Icon>dashboard</Icon>
                            </S.NavIcon>
                            <S.NavText>Dashboard</S.NavText>
                        </S.InnerNav>
                    </S.Nav>
                    <S.Nav>
                        <S.InnerNav>
                            <S.NavIcon>
                                <Icon>note</Icon>
                            </S.NavIcon>
                            <S.NavText>Creatives</S.NavText>
                        </S.InnerNav>
                    </S.Nav>
                    <S.Nav>
                        <S.InnerNav>
                            <S.NavIcon>
                                <Icon>apps</Icon>
                            </S.NavIcon>
                            <S.NavText>Campaigns</S.NavText>
                        </S.InnerNav>
                    </S.Nav>
                    <S.Nav>
                        <S.InnerNav>
                            <S.NavIcon>
                                <Icon>bar_chart</Icon>
                            </S.NavIcon>
                            <S.NavText selected={true}>Performance</S.NavText>
                        </S.InnerNav>
                    </S.Nav>
                    <S.Nav>
                        <S.InnerNav>
                            <S.NavIcon>
                                <Icon>email</Icon>
                            </S.NavIcon>
                            <S.NavText>Invoices</S.NavText>
                        </S.InnerNav>
                    </S.Nav>
                </S.InnerContainer>
            </S.Container>
        );
    }
}

export default BottomNav;
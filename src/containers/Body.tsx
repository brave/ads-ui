import { connect } from "react-redux";

import { login, logout } from "../actions";

import Dashboard from "../components/Dashboard/Dashboard";

const mapStateToProps = (state: any) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    logIn: ({ }) => dispatch(login({})),
    logOut: ({ }) => dispatch(logout({})),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

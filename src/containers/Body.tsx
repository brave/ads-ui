import { connect } from "react-redux";

import {
    SignInFailed,
    SignInStart,
    SignInSuccessful,
    SignOut,
} from "../actions";

import Dashboard from "../components/Dashboard/Dashboard";

const mapStateToProps = (state: any) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    SignInFailed: ({ }) => dispatch(SignInFailed({})),
    SignInStart: ({ }) => dispatch(SignInStart({})),
    SignInSuccessful: ({ }) => dispatch(SignInSuccessful({})),
    SignOut: ({ }) => dispatch(SignOut({})),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

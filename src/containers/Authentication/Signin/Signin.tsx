import { withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import "../../../assets/fonts/fonts.css";

import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { H1, H6 } from "../../../components/Text/Text";
// import Button from "brave-ui/components/buttonsIndicators/button";

import { GetAdvertisers, SignIn } from "../../../actions";

import { styles } from "./SignIn.style";
import * as S from "./SignIn.style";

import SigninForm from "../../../components/SigninForm/Signin-form";

class SignInContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false
    };
  }

  public render() {
    const { auth, classes, signinForm } = this.props;
    if (auth && auth.signedIn) {
      return <Redirect to="/a" />;
    }
    return (
      <Card>
        <S.Container>
          <S.Content>
            <S.Header>
              <H1 fontFamily={"Poppins"}>Sign into your account</H1>
            </S.Header>
            <SigninForm />
            <S.ButtonContainer>
              <Button onClick={this.submit} size={"medium"}>
                Sign in
              </Button>
            </S.ButtonContainer>
            <S.Footer>
              <H6 fontFamily={"Muli"} style={{ paddingRight: "8px" }}>
                Don't have an account?
              </H6>
              <H6
                fontFamily={"Muli"}
                link={true}
                onClick={() => (window.location.href = "/auth/signup")}
              >
                Sign up
              </H6>
            </S.Footer>
          </S.Content>
        </S.Container>
      </Card>
    );
  }

  private toggleSubmitting = () => {
    this.setState({
      submitting: !this.state.submitting
    });
  };

  private submit = async (event: any) => {
    this.toggleSubmitting();
    const { signinForm } = this.props;
    const { values } = signinForm;
    console.log("hello" + JSON.stringify(values));
    console.log("hello" + JSON.stringify(signinForm));
    try {
      const auth = await this.props.signin(values);
      await this.props.getAdvertiser(auth);
    } catch (err) {
      this.toggleSubmitting();
    }
  };
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  signinForm: state.form.signin
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  getAdvertiser: (value: any) => dispatch(GetAdvertisers(value)),
  signin: (value: any) => dispatch(SignIn(value))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInContainer)
);

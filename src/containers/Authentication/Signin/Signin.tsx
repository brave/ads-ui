import { withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../../assets/fonts/fonts.css";
import locale from "../../../locales/en";
import BraveLogo from "../../../assets/images/brave-logotype-full-color.png";

import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { H2 } from "../../../components/Text/Text";
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
              <img
                style={{ width: "150px", marginBottom: "24px" }}
                src={BraveLogo}
              />
              <H2 style={{ color: "#434251" }} fontFamily={"Poppins"}>
                {locale.SignIn.header}
              </H2>
            </S.Header>
            <SigninForm />
            <S.ButtonContainer>
              <Button onClick={this.submit} type={"primary"} size={"medium"}>
                {locale.SignIn.signIn}
              </Button>
            </S.ButtonContainer>
            {/* <S.Footer>
              <H6 fontFamily={"Muli"} style={{ paddingRight: "8px" }}>
                {locale.SignIn.noAccount}
              </H6>
              <H6
                fontFamily={"Muli"}
                link={true}
                onClick={() => (window.location.href = "/auth/signup")}
              >
                {locale.SignIn.signUp}
              </H6>
            </S.Footer> */}
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

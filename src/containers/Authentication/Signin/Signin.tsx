import { withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../assets/fonts/fonts.css";

import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { H2 } from "../../../components/Text/Text";
import { Text } from "../../../components/Text/Text";
// import Button from "brave-ui/components/buttonsIndicators/button";

import { GetAdvertisers, SignIn } from "../../../actions";

import { styles } from "./SignIn.style";
import * as S from "./SignIn.style";

import { Input } from "../../../components/formElements/formElements";

import base64url from "base64url";

class SignInContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
      email: '',
      password: '',
    };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/token`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });

    if (resp.status === 400) {
      alert(
        "The username or password did not match our records. Please try again."
      );
      return;
    }

    if (!resp.ok) {
      alert(
        `Unexpected error ${resp.status} validating your credentials. Please try again later.`
      );
      return;
    }
  
    let data = await resp.json();

    if (data.accessToken) {
      await this.props.signin({ email: this.state.email, password: this.state.password, accessToken: data.accessToken });
      await this.props.getAdvertiser(data);
    }

    if (data.error) {
      alert("Error " + data.error);
      return;
    }

    if (data.allowCredentials) {
      this.get(data)
    }

    this.toggleSubmitting();

  };

  toggleSubmitting() {
    this.setState({
      submitting: !this.state.submitting
    });
  }

  get(attestationObj) {

    attestationObj.challenge = base64url.toBuffer(attestationObj.challenge);

    attestationObj.allowCredentials.forEach((allowedCredential) => {
      allowedCredential.id = base64url.toBuffer(allowedCredential.id);
    });

    navigator.credentials.get({ publicKey: attestationObj })
      .then(async (cred: any) => {
        await this.sendClientCredential(cred, attestationObj.userId);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  publicKeyCredentialToJSON(pubKeyCred) {
    if (pubKeyCred instanceof Array) {
      let arr = [];
      for (let i of pubKeyCred)
        //@ts-ignore
        arr.push(publicKeyCredentialToJSON(i));

      return arr
    }

    if (pubKeyCred instanceof ArrayBuffer) {
      //@ts-ignore
      return base64url.encode(pubKeyCred)
    }

    if (pubKeyCred instanceof Object) {
      let obj = {};

      for (let key in pubKeyCred) {
        obj[key] = this.publicKeyCredentialToJSON(pubKeyCred[key])
      }

      return obj
    }

    return pubKeyCred
  }


  async sendClientCredential(clientCredential, userId) {
    const resp = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/challenge/${userId}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.publicKeyCredentialToJSON(clientCredential))
      });
    let data = await resp.json();
    try {
      await this.props.signin({ email: this.state.email, password: this.state.password, accessToken: data.accessToken });
      await this.props.getAdvertiser(data);
    } catch (err) {
      this.toggleSubmitting();
    }
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  public render() {
    const { auth } = this.props;
    if (auth && auth.signedIn) {
      return <Redirect to="/a" />;
    }
    return (
      <Card>
        <S.Container>
          <S.Content>
            <S.Header>
              <S.Logo />
              <H2 fontFamily={"Poppins"} color={"#434251"}>
                Sign into your Brave account
              </H2>
            </S.Header>
            <div style={{ marginBottom: "32px", marginTop: "22px" }}>
              <div style={{ display: "flex" }}>
                <Text content={"Email"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
              </div>
              <Input value={this.state.email} onChange={(e) => { this.handleEmail(e) }} placeholder={"Enter your email..."}></Input>
            </div>
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex" }}>
                <Text content={"Password"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
              </div>
              <Input value={this.state.password} onChange={(e) => { this.handlePassword(e) }} placeholder={"Enter your password..."} type={"password"}></Input>
            </div>

            <S.ButtonContainer>
              <Button onClick={this.submit} type={"primary"} size={"medium"}>
                Sign in
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
}

const mapStateToProps = (state: any) => ({
  auth: state.authReducer,
  signinForm: state.form.signin
});

const mapDispatchToProps = (dispatch: any) => ({
  getAdvertiser: (value: any) => dispatch(GetAdvertisers(value)),
  signin: (value: any) => dispatch(SignIn(value))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInContainer)
);

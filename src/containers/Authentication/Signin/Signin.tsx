import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../assets/fonts/fonts.css";
import BraveLogo from "../../../assets/images/brave-logotype-full-color.png";

import { GetAdvertisers, SignIn } from "../../../actions";

import base64url from "base64url";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

class SignInContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
      email: "",
      password: "",
    };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const resp = await fetch(
      `${process.env.REACT_APP_SERVER_ADDRESS}/auth/token`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      }
    );

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
      await this.props.signin({
        email: this.state.email,
        password: this.state.password,
        accessToken: data.accessToken,
      });
      await this.props.getAdvertiser(data);
    }

    if (data.error) {
      alert("Error " + data.error);
      return;
    }

    if (data.allowCredentials) {
      this.get(data);
    }

    this.toggleSubmitting();
  }

  toggleSubmitting() {
    this.setState({
      submitting: !this.state.submitting,
    });
  }

  get(attestationObj) {
    attestationObj.challenge = base64url.toBuffer(attestationObj.challenge);

    attestationObj.allowCredentials.forEach((allowedCredential) => {
      allowedCredential.id = base64url.toBuffer(allowedCredential.id);
    });

    navigator.credentials
      .get({ publicKey: attestationObj })
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
      //@ts-ignore
      for (let i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

      return arr;
    }

    if (pubKeyCred instanceof ArrayBuffer) {
      //@ts-ignore
      return base64url.encode(pubKeyCred);
    }

    if (pubKeyCred instanceof Object) {
      let obj = {};

      for (let key in pubKeyCred) {
        obj[key] = this.publicKeyCredentialToJSON(pubKeyCred[key]);
      }

      return obj;
    }

    return pubKeyCred;
  }

  async sendClientCredential(clientCredential, userId) {
    const resp = await fetch(
      `${process.env.REACT_APP_SERVER_ADDRESS}/auth/challenge/${userId}`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.publicKeyCredentialToJSON(clientCredential)),
      }
    );
    let data = await resp.json();
    try {
      await this.props.signin({
        email: this.state.email,
        password: this.state.password,
        accessToken: data.accessToken,
      });
      await this.props.getAdvertiser(data);
    } catch (err) {
      this.toggleSubmitting();
    }
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  public render() {
    const { auth } = this.props;
    if (auth && auth.signedIn) {
      return <Redirect to="/a" />;
    }
    return (
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 100% 100% at 0% 0%,rgb(57, 45, 209, 0.8) 0%,rgb(255, 67, 67, 0.8) 100%)",
          height: "100%",
        }}
      >
        <Box height="520px" width="750px">
          <Card sx={{ padding: "50px" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="div"
                width="150px"
                height="60px"
                marginBottom="24px"
                sx={{
                  background: `url(${BraveLogo}) no-repeat center`,
                  backgroundSize: "100%",
                }}
              />
              <Typography
                sx={{ fontFamily: "Poppins", color: "#434251" }}
                variant="h4"
              >
                Sign into your brave account
              </Typography>
              <TextField
                sx={{ mt: 5, mb: 3 }}
                fullWidth
                onChange={(evt) => this.setState({ email: evt.target.value })}
                label="Email"
                placeholder="Enter your email"
              />
              <TextField
                fullWidth
                type="password"
                sx={{ mb: 3 }}
                onChange={(evt) =>
                  this.setState({ password: evt.target.value })
                }
                label="Password"
                placeholder="Enter your password"
              />
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
                onClick={() => this.submit()}
              >
                Sign in
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.authReducer,
  signinForm: state.form.signin,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAdvertiser: (value: any) => dispatch(GetAdvertisers(value)),
  signin: (value: any) => dispatch(SignIn(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);

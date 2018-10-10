import { createMuiTheme, CssBaseline, MuiThemeProvider, Snackbar, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CloseSnackBar as close } from "./actions";

import Body from "./containers/Body";
import Footer from "./containers/Footer";
import Header from "./containers/Header";

import { styles } from "./App.styles";

class App extends React.Component<any, any> {

  private theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fb542b",
      },
      secondary: {
        contrastText: "#ffcc00",
        light: "#0066ff",
        main: "#0044ff",
      },
    },
    typography: {
      useNextVariants: true,
    },
  });

  public render() {
    const { classes, CloseSnackBar, snackbar } = this.props;

    return (
      <MuiThemeProvider theme={this.theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header></Header>
          <div className={classes.body}>
            <Body></Body>
          </div>
          <Footer></Footer>
          <Snackbar
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom",
            }}
            message={<span>{snackbar.message}</span>}
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={CloseSnackBar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  snackbar: state.snackBarReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseSnackBar: () => dispatch(close({})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));

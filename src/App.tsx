import { CssBaseline, Snackbar, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CloseSnackBar as close } from "./actions";

import Body from "./containers/Body";
import Footer from "./containers/Footer";
import Header from "./containers/Header";

import { styles } from "./App.styles";

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes, CloseSnackBar, snackbar } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header></Header>
        <div className={classes.body}>
          <Body></Body>
        </div>
        <Footer></Footer>
        <Snackbar
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          message={<span>{snackbar.message}</span>}
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={CloseSnackBar}
        />
      </div>
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

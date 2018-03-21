import * as React from "react";
import { connect } from "react-redux";

import { GetCreatives } from "../../actions";

import CreativeItem from "./CreativeItem/CreativeItem";

class Creatives extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetCreatives(this.props.userReducer);
  }
  public render() {
    const { creatives } = this.props.creativeReducer;
    const listItems = creatives.map((item: any) => {
      return (
        <CreativeItem creative={item}/>
      );
    });
    return (
      <div>
        <div>
          Creatives
        </div>
        <div>
          {listItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  creativeReducer: state.creativeReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCreatives: (user: any) => dispatch(GetCreatives(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Creatives);

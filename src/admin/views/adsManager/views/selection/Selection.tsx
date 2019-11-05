import React, { Component } from 'react';

import Context from "../../../../../state/context";
import { Text } from "../../../../../components/Text/Text";
import "./lib/corner-ribbon.css";
import Test from "./lib/advanced_create2.png";
import Test1 from "./lib/quick_create5.png";
import Test2 from "./lib/automated_create.png";
import { Link } from 'react-router-dom';
const linkStyle = { textDecoration: "none", color: "inherit" };

class Selection extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
    }
    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        //   this.context.setLoading(true);
        this.context.setSidebar("hidden");
        //   let data = await fetchData(this.props.auth.accessToken);
        //   let processedData = processData(data);
        //   this.setState(processedData, () => {
        //     this.context.setLoading(false);
        //   });
    }

    public componentWillUnmount() {
        this.context.setLoading(undefined);
    }
    render() {
        return (
            <React.Fragment>
                <div style={{ width: "500px", height: "250px", marginLeft: "auto", marginRight: "auto", marginTop: "0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Text sizes={[16, 16, 15, 15, 26]} fontFamily={"Poppins"}>
                        Create an Ad Campaign
                    </Text>
                    <Text style={{ marginTop: "12px" }} sizes={[16, 16, 15, 15, 18]} fontFamily={"Muli"}>
                        Choose an order type and we'll guide you through the rest.
                    </Text>
                </div>
                <div style={{ width: "100%", height: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className={"box"} style={{ display: "flex", width: "340px", height: "370px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px", flexDirection: "column", alignItems: "center" }}>
                        <img style={{ height: "180px", marginTop: "0px", marginLeft: "auto", marginRight: "auto", transform: "scale(-1, 1)" }} src={Test1} />
                        <Text style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"}>
                            Quick Order
                        </Text>
                        <Text style={{ marginTop: "12px", marginLeft: "6px", marginRight: "1px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Publish a campaign in less than 5 minutes. Define your creatives and audience and you're on your way!
                    </Text>
                    </div>
                    <Link style={linkStyle} to={`/admin/main/adsmanager/advanced?test=hello`}>
                        <div className={"box"} style={{ display: "flex", width: "340px", height: "370px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px", flexDirection: "column", alignItems: "center" }}>

                            <img style={{ height: "180px", transform: "scale(-1, 1)" }} src={Test} />
                            <Text style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"}>
                                Advanced Order
                        </Text>
                            <Text style={{ marginTop: "12px", marginLeft: "6px", marginRight: "6px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                                Have complete control of your campaign, choose multiple ad sets, and fine tune your creatives.
                    </Text>
                        </div>
                    </Link>
                    <div className={"box"} style={{ display: "flex", width: "340px", height: "370px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px", flexDirection: "column", alignItems: "center" }}>
                        <img style={{ height: "180px", marginTop: "0px", marginLeft: "auto", marginRight: "auto" }} src={Test2} />
                        <Text style={{ marginTop: "16px" }} sizes={[16, 16, 15, 15, 21]} fontFamily={"Poppins"}>
                            Automated Order
                        </Text>
                        <Text style={{ marginTop: "12px", marginLeft: "6px", marginRight: "6px" }} sizes={[16, 16, 15, 15, 14]} fontFamily={"Muli"}>
                            Upload a prepared CSV or script and we'll convert it into a campaign for your review.
                    </Text>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Selection;
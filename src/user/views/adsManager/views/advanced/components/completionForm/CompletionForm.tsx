import React, { Component } from 'react';
import Confetti from 'react-confetti'

import Section from '../../../../../../../components/section/Section';
import { Text } from "../../../../../../../components/Text/Text";
import present from "./assets/present.png";
import { Link } from 'react-router-dom';

const linkStyle = { textDecoration: "none", color: "inherit" };

class CompletionForm extends Component<any, any> {

    render() {
        return (
            <div style={{ marginLeft: "-255px" }}>
                <Confetti style={{ top: "-62px" }} colors={["#FB7959", "#4C54D2"]} />
                <div style={{ width: "843px", height: "100%", marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center" }}>
                    <Section style={{ marginTop: "auto", marginBottom: "auto" }} fullWidthChild={true}>
                        <div style={{ zIndex: 5, backgroundColor: "white" }}>
                            <div style={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
                                <img src={present} style={{ width: "400px", marginLeft: "auto", marginRight: "auto" }} />
                                <Text content={"Congratulations!"} sizes={[16, 16, 15, 15, 28]} fontFamily={"Poppins"} />
                                <div style={{ width: "75%" }}>
                                    {this.props.editMode ?
                                        <Text style={{ textAlign: "center", marginTop: "8px" }} content={"Your campaign has been updated and new creatives will be reviewed by our ads team, we'll send you an e-mail as soon as your creatives are approved and activated. Thank you for using Brave Ads!"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                        :
                                        <Text style={{ textAlign: "center", marginTop: "8px" }} content={"Your campaign has been created and is now being reviewed by our ads team, we'll send you an e-mail as soon as your campaign is approved and activated. Thank you for using Brave Ads!"} sizes={[16, 16, 15, 15, 15]} fontFamily={"Poppins"} />
                                    }
                                </div>
                                <Link style={linkStyle} to={"/admin/main/dashboard"}>
                                    <div onClick={() => { }} style={{ display: "flex", justifyContent: "center", padding: "0px 20px", width: "100px", background: "#4C54D2", color: "white", border: "none", borderRadius: "100px 100px 100px 100px", marginTop: "16px", cursor: "pointer" }}>
                                        <span>
                                            <Text style={{ paddingTop: "6px", paddingBottom: "6px" }} sizes={[16, 16, 15, 15, 14]} fontWeight={500} fontFamily={"Poppins"}>
                                                Done
                                        </Text>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        );
    }
}

export default CompletionForm;
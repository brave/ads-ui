import React, { Component } from "react";
import { Text } from "./../../Text/Text";
import BraveLogo from "./assets/brave_logo_icon.png";

class OSNotificationCreativePreview extends Component<any, any> {
  render() {
    return (
      <div>
        <>
          <Text
            content={"Mac OS"}
            style={{ marginBottom: "-8px" }}
            sizes={[16, 16, 15, 15, 13]}
            fontFamily={"Poppins"}
          />
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "100%",
              height: "133px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "106px",
                width: "359px",
                borderRadius: "13px",
                border: "1px solid #e2e2e2",
                backgroundColor: "rgba(248, 248, 248, 0.82)",
                padding: "8px",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <img
                  src={BraveLogo}
                  style={{ height: "26px", width: "26px" }}
                />
                <Text
                  content={"BRAVE REWARDS"}
                  color={"rgb(142, 142, 147)"}
                  style={{ paddingTop: "3px", paddingLeft: "3px" }}
                  sizes={[16, 16, 15, 15, 13]}
                  fontFamily={"Poppins"}
                />
                <Text
                  content={"now"}
                  style={{
                    marginLeft: "auto",
                    paddingTop: "5px",
                    paddingRight: "4px",
                  }}
                  color={"rgb(142, 142, 147)"}
                  sizes={[16, 16, 15, 15, 11]}
                  fontFamily={"Poppins"}
                />
              </div>
              <div style={{ display: "flex", width: "100%", marginTop: "8px" }}>
                <Text
                  content={this.props.title}
                  style={{ paddingLeft: "5px" }}
                  sizes={[16, 16, 15, 15, 12]}
                  fontFamily={"Muli"}
                  fontWeight={600}
                />
              </div>
              <div style={{ marginTop: "8px", overflowWrap: "break-word" }}>
                <Text
                  style={{ width: "250px", paddingLeft: "5px" }}
                  content={this.props.body}
                  sizes={[16, 16, 15, 15, 12]}
                  fontFamily={"Muli"}
                />
              </div>
            </div>
          </div>

          <Text
            content={"iOS"}
            style={{ marginBottom: "-38px" }}
            sizes={[16, 16, 15, 15, 13]}
            fontFamily={"Poppins"}
          />
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "100%",
              height: "133px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "82px",
                width: "326px",
                borderRadius: "13px",
                border: "1px solid #e2e2e2",
                backgroundColor: "rgb(250, 250, 250)",
                padding: "8px",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <img
                  src={BraveLogo}
                  style={{ height: "44px", width: "44px" }}
                />
                <div
                  style={{ display: "flex", width: "100%", marginTop: "4px" }}
                >
                  <Text
                    content={this.props.title}
                    style={{ paddingLeft: "5px" }}
                    sizes={[16, 16, 15, 15, 12]}
                    fontFamily={"Muli"}
                    fontWeight={600}
                  />
                  <Text
                    content={"now"}
                    style={{ marginLeft: "auto", paddingRight: "4px" }}
                    color={"rgb(142, 142, 147)"}
                    sizes={[16, 16, 15, 15, 11]}
                    fontFamily={"Poppins"}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "-20px",
                  paddingLeft: "49px",
                  overflowWrap: "break-word",
                }}
              >
                <Text
                  style={{ width: "250px" }}
                  content={this.props.body}
                  sizes={[16, 16, 15, 15, 12]}
                  fontFamily={"Muli"}
                />
              </div>
            </div>
          </div>

          <Text
            content={"Windows"}
            style={{ marginBottom: "-12px" }}
            sizes={[16, 16, 15, 15, 13]}
            fontFamily={"Poppins"}
          />
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "100%",
              height: "133px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "126px",
                width: "300px",
                backgroundColor: "rgb(61, 61, 61)",
                padding: "8px",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <img
                  src={BraveLogo}
                  style={{ height: "44px", width: "44px", marginTop: "5px" }}
                />
                <div style={{ marginTop: "12px" }}>
                  <div style={{ overflowWrap: "break-word" }}>
                    <Text
                      style={{ width: "230px", paddingLeft: "5px" }}
                      color={"white"}
                      fontWeight={600}
                      content={this.props.title}
                      sizes={[16, 16, 15, 15, 12]}
                      fontFamily={"Muli"}
                    />
                  </div>
                  <div style={{ marginTop: "8px", overflowWrap: "break-word" }}>
                    <Text
                      style={{ width: "230px", paddingLeft: "5px" }}
                      color={"white"}
                      content={this.props.body}
                      sizes={[16, 16, 15, 15, 12]}
                      fontFamily={"Muli"}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(101, 101, 101)",
                  width: "88px",
                  height: "28px",
                  marginLeft: "auto",
                  marginTop: "12px",
                  marginRight: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  content={"Close"}
                  color={"white"}
                  sizes={[16, 16, 15, 15, 12]}
                  fontFamily={"Muli"}
                />
              </div>
            </div>
          </div>
          <Text
            content={"Android"}
            style={{ marginBottom: "-36px" }}
            sizes={[16, 16, 15, 15, 13]}
            fontFamily={"Poppins"}
          />
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "100%",
              height: "120px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "72px",
                width: "340px",
                borderRadius: "13px",
                border: "1px solid #e2e2e2",
                backgroundColor: "rgb(250, 250, 250)",
                padding: "8px",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <img
                  src={BraveLogo}
                  style={{ height: "44px", width: "44px", marginTop: "5px" }}
                />
                <div
                  style={{
                    marginTop: "2px",
                    overflowWrap: "break-word",
                    marginRight: "8px",
                  }}
                >
                  <Text
                    style={{ width: "230px", paddingLeft: "5px" }}
                    fontWeight={600}
                    content={this.props.title}
                    sizes={[16, 16, 15, 15, 12]}
                    fontFamily={"Muli"}
                  />
                  <Text
                    content={this.props.body}
                    style={{
                      width: "230px",
                      paddingLeft: "5px",
                      marginTop: "8px",
                    }}
                    sizes={[16, 16, 15, 15, 12]}
                    fontFamily={"Muli"}
                  />
                </div>
                {/* <div style={{ marginLeft: "auto", width: "90px", height: "72px", marginTop: "-8px", marginRight: "-8px", borderRadius: "13px", borderLeft: "1px solid #dfdfdf", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}>
                                    <div style={{ borderBottom: "1px solid #dfdfdf", height: '36px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Text content={"Close"} style={{ paddingLeft: '5px' }} sizes={[16, 16, 15, 15, 12]} fontFamily={"Muli"} />

                                    </div>
                                    <div style={{ height: '36px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Text content={"View"} style={{ paddingLeft: '5px' }} sizes={[16, 16, 15, 15, 12]} fontFamily={"Muli"} />
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>

          {/* <Text style={{ marginBottom: "28px" }} content={"* Please note, we're working on getting the preview just right, this is a close approximation to what OS vendors will display"} sizes={[16, 16, 15, 15, 11]} fontFamily={"Poppins"} /> */}
        </>
      </div>
    );
  }
}

export default OSNotificationCreativePreview;

import React, { useContext, useEffect, useState, useRef } from "react";
import Section from "../../components/section/Section";
import { Text } from "../../components/Text/Text";
import { InputContainer } from "../../components/formElements/formElements";
import Select from 'react-select';
import _ from "lodash";

const Settings = props => {


    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#fafafa"
        }),
    }

    const setActiveAdvertiser = (e) => {
        props.setActiveAdvertiser(_.find(props.advertisers, { id: e.value }))
    }

    const advertisers = () => {
        let advertisers = [] as any;
        props.advertisers.forEach((advertiser) => {
            advertisers.push({
                value: advertiser.id,
                label: advertiser.name
            })
        });
        return advertisers;
    }

    return (
        <div>
            <Text content="Account Settings" fontFamily="Poppins" sizes={[22, 22, 22, 22, 22]}></Text>
            <div style={{ marginTop: "48px", marginBottom: "48px" }}></div>
            <Text content="Organization" fontFamily="Poppins" sizes={[22, 22, 22, 22, 18]}></Text>
            <div style={{ marginBottom: "28px" }}></div>

            <div style={{ height: "400px" }}>
                <InputContainer>
                    <div style={{ display: "flex", marginBottom: "4px" }}>
                        <Text content={"Select organization"} sizes={[16, 16, 15, 15, 13]} fontFamily={"Poppins"} />
                    </div>
                    <Select
                        styles={customStyles}
                        onChange={setActiveAdvertiser}
                        value={{ value: props.activeAdvertiser.id, label: props.activeAdvertiser.name }}
                        options={advertisers()}
                    />

                </InputContainer>
            </div>

        </div>
    );
}


export default Settings;

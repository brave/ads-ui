import React, { Component } from 'react';
import TabSelector from '../../../../components/tabSelector/TabSelector';
import { Text } from "../../../../components/Text/Text";
import Section from '../../../../components/section/Section';

class AccountSettings extends Component<any, any> {

    render() {

        const { auth, classes, drawer, match } = this.props;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/settings", "") + "/overview" },
            { label: "Documents", selected: false, link: match.url.replace("/settings", "") + "/documents" },
            { label: "Billing", selected: false, link: match.url.replace("/settings", "") + "/billing" },
            { label: "History", selected: false, link: match.url.replace("/settings", "") + "/history" },
            { label: "Settings", selected: true, link: match.url.replace("/settings", "") + "/settings" },
        ]

        return <div>
            <TabSelector config={tabConfig} />

            <Section fullWidthChild={true} header={"Security"}>
                <div style={{ width: "100%" }}>
                    <Text content={"Two Factor Authentication: Off"} fontFamily={"Poppins"} sizes={[20, 20, 16, 16, 18]} />
                </div>
            </Section>
        </div>
    }

}

export default AccountSettings; 
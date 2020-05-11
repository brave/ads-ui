import React, { Component } from 'react';
import TabSelector from '../../../../components/tabSelector/TabSelector';

class OrganizationCreatives extends Component<any, any> {

    render() {

        const { auth, classes, drawer, match } = this.props;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/creatives", "") + "/overview" },
            { label: "Users", selected: false, link: match.url.replace("/creatives", "") + "/users" },
            { label: "Campaigns", selected: false, link: match.url.replace("/creatives", "") + "/campaigns" },
            { label: "Creatives", selected: true, link: match.url.replace("/creatives", "") + "/creatives" },
            { label: "Invoices", selected: false, link: match.url.replace("/creatives", "") + "/invoices" },
        ]

        return <div>
            <TabSelector config={tabConfig} />
            Creative Component coming soon, please use users tab while under construction...

            </div>
    }

}

export default OrganizationCreatives; 
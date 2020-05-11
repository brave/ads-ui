import React, { Component } from 'react';
import TabSelector from '../../../../components/tabSelector/TabSelector';

class OrganizationInvoices extends Component<any, any> {

    render() {

        const { auth, classes, drawer, match } = this.props;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/invoices", "") + "/overview" },
            { label: "Users", selected: false, link: match.url.replace("/invoices", "") + "/users" },
            { label: "Campaigns", selected: false, link: match.url.replace("/invoices", "") + "/campaigns" },
            { label: "Creatives", selected: false, link: match.url.replace("/invoices", "") + "/creatives" },
            { label: "Invoices", selected: true, link: match.url.replace("/invoices", "") + "/invoices" },
        ]

        return <div>
            <TabSelector config={tabConfig} />
            Invoices coming soon...

            </div>
    }

}

export default OrganizationInvoices; 
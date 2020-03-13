import React, { useContext, useEffect, useState } from "react";
import TabSelector from "../../../../components/tabSelector/TabSelector";

const CampaignListPacing = props => {
    const { match } = props;

    const tabConfig = [
        { label: "Overview", selected: false, link: match.url.replace("/pacing", "/overview") },
        { label: "Pacing", selected: true, link: match.url },
        { label: "Approvals", selected: false, link: match.url.replace("/pacing", "/approvals") },
    ]

    return <>
        <TabSelector config={tabConfig} />
        Pacing view coming soon!
    </>
}

export default CampaignListPacing;
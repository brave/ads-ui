import React from "react";

export default React.createContext({
    loading: undefined,
    sidebar: "visible",
    setLoading: (loading) => { },
    setSidebar: (sidebar) => { },
})

export const setActiveAdvertiser = (advertiser: any) => {
  window.localStorage.setItem("activeAdvertiser", JSON.stringify(advertiser));
}

export const getActiveAdvertiser = () => {
  const adv = window.localStorage.getItem("activeAdvertiser");

  if (adv) {
    const parsed = JSON.parse(adv);
    return { id: parsed.id, name: parsed.name };
  }

  return null;
}

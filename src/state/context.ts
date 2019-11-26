import React from "react";

export default React.createContext({
    loading: undefined,
    sidebar: "visible",
    setLoading: (loading) => { },
    setSidebar: (sidebar) => { },
})
const drawerWidth = 240;

export const styles = (theme: any) => ({
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  flex: {
    flex: 1,
  },
  hide: {
    display: "none",
  },
  logo: {
    height: "40px",
    width: "40px",
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
} as any);

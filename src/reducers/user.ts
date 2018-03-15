const user = (
  state = {
    loggedIn: false,
  },
  action: any,
) => {
  // tslint:disable-next-line:no-console
  console.log(state, action);
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedIn: true };
    case "LOGOUT":
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default user;

export const setActiveAdvertiser = (id?: string) => {
  if (id) {
    window.localStorage.setItem("activeAdvertiser", id);
  }
};

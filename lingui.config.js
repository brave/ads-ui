module.exports = {
  locales: ["en", "es"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
  format: "po",
};

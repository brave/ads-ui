module.exports = {
  locales: ["en", "es", "por"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
  format: "po",
};

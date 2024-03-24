const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 4000,
  env:  {
    url: "https://rahulshettyacademy.com/"
  },

  retries: {
    runMode: 1,

  },
  projectId: "kdkosg",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      {
        name: 'chrome'
      }
    },
  },
});

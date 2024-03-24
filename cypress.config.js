const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 4000,
  env:  {
    url: "https://rahulshettyacademy.com/",
    url2: 'https://todo.qacart.com/api/v1/tasks/',
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

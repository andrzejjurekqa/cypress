const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {
  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      });
      return result;
    }
  })
  return config;
}
module.exports = defineConfig({
  defaultCommandTimeout: 4000,
  env: {
    url: "https://rahulshettyacademy.com/",
    url2: 'https://todo.qacart.com/api/v1/tasks/',
  },

  retries: {
    runMode: 1,

  },
  projectId: "kdkosg",
  e2e: {
    setupNodeEvents
    },
});

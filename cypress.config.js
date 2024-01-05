const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      { "reporter"; "mochawesome", 
        "reporterOptions"; 
          { "reportDir"; "cypress/report/mochawesome-report", 
           "overwrite"; false, 
           "html"; true, 
           "json"; false, 
           "timestamp"; "mmddyyyy_HHMMss" }}
    },
  },
  video: true
};


const { Given } = require("@cucumber/cucumber");
const FixtureLoader = require("../utils/FixtureLoader");
const fs = require("fs/promises");

Given("I load fixtures {string}", async function (filenames) {
  
  filenames = filenames.split(",");
  for (let key in filenames) {
    filenames[key] = await fs.realpath(__dirname + "/" + filenames[key]);
  }
  await FixtureLoader(...filenames);
});
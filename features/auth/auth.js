const { Given, Then, When } = require("@cucumber/cucumber");
const supertest = require("supertest");
const app = require("../../server");
const client = supertest(app);
const { expect } = require("expect");
const ReferenceManager = require("../utils/ReferenceManager");

Given('I have a payload', function (dataTable) {
    this.payload = dataTable.rowsHash();
});

When("I request {string} {string} with payload", async function (method, path) {

    this.request = client[method.toLowerCase()](path).set(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    if (this.token) {
        this.request.set("Authorization", "Bearer " + this.token);
    }
    this.response = await this.request.send(this.payload);
});

Then("The response status should be {int}", function (statusCode) {
    expect(this.response.status).toBe(statusCode);
});

Then(
    "I should have an object with the following attributes",
    function (dataTable) {
        const expected = dataTable.rowsHash();
        const actual = this.response.body;
        console.log(actual);
        expect(typeof actual).toBe("object");
        Object.keys(expected).forEach((key) => {
            expect(actual).toHaveProperty(key, expected[key]);
        });
    }
);

Then("I should have the {string} attribute", function (attr) {
    expect(this.response.body).toHaveProperty(attr);
});

Given("I am authenticated with {string}", async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const user = ReferenceManager.getReference(string);
    const request = client["POST".toLowerCase()]("/users/authenticate").set(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    const response = await request.send(user);
    this.token = response.body.token;
});
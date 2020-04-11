/// <reference types="cypress" />

describe("<App />", function () {
  before(function () {});

  beforeEach(function () {
    cy.server();
    cy.fixture("todos").as("todos");
    cy.route("GET", "https://todo-r-c17.firebaseio.com/todos.json", "@todos");
    cy.route("PUT", "https://todo-r-c17.firebaseio.com/todos.json", {});
    cy.visit("http://localhost:3000");
  });

  it("should add a todo", function () {
    cy.location("pathname").should("equal", "/todos/all");
    cy.findByPlaceholderText(/Ajouter/i).type("test fixture 3");
    cy.findByText(/^Ajouter$/i).click();
    cy.get("li").should("have.length", 3);
  });

  it("should delete a todo", function () {
    cy.contains("delete").first().click();
    cy.get("li").should("have.length", 1);
  });

  it("should edit a todo", function () {
    cy.findAllByText(/edit/i).first().click();
    cy.findByDisplayValue(/test fixture 1/i)
      .clear()
      .type("test fixture updated");
    cy.findByText(/save/i).click();
    cy.findByText(/test fixture updated/).should("exist");
  });
});

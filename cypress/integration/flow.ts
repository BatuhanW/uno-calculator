/// <reference types="cypress" />

describe("Add player spec", () => {
  it("works", () => {
    cy.visit("/");

    cy.get("[data-cy=newPlayerInput]").type("Test Player 1");

    cy.get("[data-cy=newPlayerSubmit]").click();

    cy.get("[data-cy=playerName]").should("have.text", "Test Player 1");

    cy.get("[data-cy=newPlayerInput]").type("Test Player 2");

    cy.get("[data-cy=newPlayerSubmit]").click();

    cy.get("[data-cy=playerName]").should("contain", "Test Player 2");

    cy.get("[data-cy=newPlayerInput]").type("Test Player 3");

    cy.get("[data-cy=newPlayerSubmit]").click();

    cy.get("[data-cy=playerName]").should("contain", "Test Player 3");

    cy.get("[data-cy=newPlayerInput]").type("Test Player 4");

    cy.get("[data-cy=newPlayerSubmit]").click();

    cy.get("[data-cy=playerName]").should("contain", "Test Player 4");

    cy.get("[data-cy=playerName]").should("have.length", 4);

    cy.get("[data-cy=newPlayerInput]").type("Test Player 5");

    cy.get("[data-cy=newPlayerSubmit]").click();

    cy.get("[data-cy=playerName]").should("contain", "Test Player 5");

    cy.get("[data-cy=removePlayer]").eq(4).click();

    cy.get("[data-cy=playerName]").should("not.contain", "Test Player 5");

    cy.get("[data-cy=roundButton]").eq(0).click();

    cy.get("[data-cy=scoreInput]").eq(0).type("15");
    cy.get("[data-cy=roundScore]").eq(0).contains(15);
    cy.get("[data-cy=totalScore]").eq(0).contains(15);

    cy.get("[data-cy=scoreInput]").eq(1).type("25");
    cy.get("[data-cy=roundScore]").eq(1).contains(25);
    cy.get("[data-cy=totalScore]").eq(1).contains(25);

    cy.get("[data-cy=scoreInput]").eq(2).type("35");
    cy.get("[data-cy=roundScore]").eq(2).contains(35);
    cy.get("[data-cy=totalScore]").eq(2).contains(35);

    cy.get("[data-cy=scoreInput]").eq(3).type("45");
    cy.get("[data-cy=roundScore]").eq(3).contains(45);
    cy.get("[data-cy=totalScore]").eq(3).contains(45);

    cy.get("[data-cy=topPlayers]").eq(0).contains("Test Player 1");
    cy.get("[data-cy=topPlayers]").eq(1).contains("Test Player 2");

    cy.get("[data-cy=roundButton]").eq(1).click();

    cy.get("[data-cy=scoreInput]").eq(0).type("15");
    cy.get("[data-cy=roundScore]").eq(0).contains(15);
    cy.get("[data-cy=totalScore]").eq(0).contains(30);

    cy.get("[data-cy=scoreInput]").eq(1).type("25");
    cy.get("[data-cy=roundScore]").eq(1).contains(25);
    cy.get("[data-cy=totalScore]").eq(1).contains(50);

    cy.get("[data-cy=scoreInput]").eq(2).type("35");
    cy.get("[data-cy=roundScore]").eq(2).contains(35);
    cy.get("[data-cy=totalScore]").eq(2).contains(70);

    cy.get("[data-cy=scoreInput]").eq(3).type("45");
    cy.get("[data-cy=roundScore]").eq(3).contains(45);
    cy.get("[data-cy=totalScore]").eq(3).contains(90);

    cy.get("[data-cy=topPlayers]").eq(0).contains("Test Player 1");
    cy.get("[data-cy=topPlayers]").eq(1).contains("Test Player 2");

    cy.get("[data-cy=removePlayer]").eq(0).click();

    cy.get("[data-cy=topPlayers]").eq(0).contains("Test Player 2");
    cy.get("[data-cy=topPlayers]").eq(1).contains("Test Player 3");
  });
});

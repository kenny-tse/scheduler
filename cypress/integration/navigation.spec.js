
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should navigate to Tuesday", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item day-list__item--selected");
  })
});
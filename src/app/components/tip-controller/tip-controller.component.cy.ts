/// <reference types="cypress" />
import { TipControllerComponent } from "./tip-controller.component";

describe("TipComponent test", () => {
	beforeEach(() => {
		cy.mount(TipControllerComponent);
	});

	it("Changes background color on click", () => {
		cy.get(".tip").each(el => {
			cy.wrap(el).click();
			cy.wrap(el).should("have.class", "active");
		});
	})
})
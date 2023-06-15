/// <reference types="cypress" />

import { Constants } from './constants';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(Constants.URL);
  });

  it('calculates output', () => {
    cy.get(Constants.Selector.AMOUNT)
      .clear()
      .type(Constants.SPLIT.bill.toString());
    cy.get(Constants.Selector.NUMBER_OF_PEOPLE).then((e) =>
      e.val(Constants.SPLIT.numberOfPeople)
    );
    cy.get(
      `${Constants.Selector.TIP}[data-tip=${Constants.SPLIT.tip}]`
    ).click();

    cy.get(Constants.Selector.OUTPUT_TOTAL).should('not.contain.text', '$0.00');
    cy.get(Constants.Selector.OUTPUT_TIP).should('not.contain.text', '$0.00');
  });

  it('resets the input and output on reset button click', () => {
    cy.get(Constants.Selector.BTN_RESET).click();

    cy.get(Constants.Selector.AMOUNT).should('have.value', '0');
    cy.get(Constants.Selector.NUMBER_OF_PEOPLE).should('have.value', '1');

    cy.get(Constants.Selector.TIP).each((tip) => {
      cy.wrap(tip).should('not.have.class', 'active');
    });

    cy.get(Constants.Selector.OUTPUT_TOTAL).should('contain.text', '$0.00');
    cy.get(Constants.Selector.OUTPUT_TIP).should('contain.text', '$0.00');
  });

  it('does not allow less then 1 memeber', () => {
    cy.get(Constants.Selector.NUMBER_OF_PEOPLE).clear();
    cy.get(Constants.Selector.NUMBER_OF_PEOPLE).should("have.value", 1);
  });
});

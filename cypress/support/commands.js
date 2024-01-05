Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Estefany')
    cy.get('#lastName').type('Raila')
    cy.get('#email').type('esterrailaa@gmail.com')

    cy.get('#email-checkbox').click()
    
    cy.get('#open-text-area').type('O curso é muito útil.')

    cy.get('.button').click()
})
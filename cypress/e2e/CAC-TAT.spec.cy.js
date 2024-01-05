/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => cy.visit('../../src/index.html'))

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Estefany')
    cy.get('#lastName').type('Raila')
    cy.get('#email').type('esterrailaa@gmail.com')

    
    cy.get('#open-text-area').type('O curso é muito útil. Este é um texto longo que será digitado na área de texto.', { delay: 0 })

    cy.contains('button', 'Enviar').click()

    //Verificar se aparece a mensagem de sucesso
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        // Dados
        cy.get('#firstName').type('Estefany')
        cy.get('#lastName').type('Raila')
        cy.get('#email').type('esterrailaa@gmailcom')

        
        //Como podemos te ajudar
        cy.get('#open-text-area').type('O curso é muito útil.')
    
        //Enviar
        cy.contains('button', 'Enviar').click()

        // Verificar se a mensagem de erro é exibida
        cy.get('.error').should('be.visible')

  })

  it('Campo de telefone continua vazio ao ser preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdef')
      .should('have.text', '')

  } )

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Estefany')
      cy.get('#lastName').type('Raila')
      cy.get('#email').type('esterrailaa@gmail.com')
      
      cy.get('#product').select('cursos')
  
      cy.get('[type="radio"]').eq(1).check()
  
      // Meio de Contato preferencial
      cy.get('#phone-checkbox').click()

      cy.get('#open-text-area').type('O curso é muito útil.')
      cy.contains('button', 'Enviar').click()
  

      // Verificar se a mensagem de erro é exibida
      cy.get('.error').should('be.visible')

  } )

it('Envia o formuário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()

  //Verificar se aparece a mensagem de sucesso
   cy.get('.success').should('be.visible')
})

it('Seleciona um produto (YouTube) por seu texto', () => {
   cy.get('#product').select('YouTube').should('have.value', 'youtube')
})

it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

it('Seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product').select(1).should('have.value', 'blog')
})

it('Marca o tipo de atendimento "Feedback"', () => {
  cy.get('[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
})

it('Marca cada tipo de atendimento', () => {
  cy.get('[type="radio"]')
  .each(function ($radio) { 
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })
})

it('Marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('[type="checkbox"]')
  .check()
  .should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})

it('Seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
  .selectFile('./cypress/fixtures/example.json')
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('Seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#file-upload')
  .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture("example.json").as('sampleFile')
  cy.get('#file-upload')
  .selectFile('@sampleFile')
  .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
})
})

it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.get('#privacy a').should('have.attr', 'target', '_blank')
})

it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click()

  cy.contains('Talking About Testing').should('be.visible')
})

})
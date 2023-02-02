describe('authentication workflow', () => {
  it('can perform the user login workflow', () => {
    cy.visit('http://localhost:3000');
    cy.get('#username', { timeout: 10000 }).type('john.doe');
    cy.get('#password').type('johndoe');
    cy.get('#kc-login').click({ timeout: 5000 });
    cy.get('h2').contains('Sample page 1');
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('[href="/sample/page-1"] > .MuiListItemText-root > .MuiTypography-root');
    cy.get('[href="/sample/page-2"] > .MuiListItemText-root > .MuiTypography-root');
    cy.get('[href="/sample/page-3"] > .MuiListItemText-root > .MuiTypography-root').should('not.exist');
    cy.get('.css-1o7fyxv').contains('John Doe');
  });

  it('can perform the admin login workflow', () => {
    cy.visit('http://localhost:3000');
    cy.get('#username', { timeout: 10000 }).type('jane.doe');
    cy.get('#password').type('janedoe');
    cy.get('#kc-login').click({ timeout: 5000 });
    cy.get('h2').contains('Sample page 1');
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('[href="/sample/page-1"] > .MuiListItemText-root > .MuiTypography-root');
    cy.get('[href="/sample/page-2"] > .MuiListItemText-root > .MuiTypography-root');
    cy.get('[href="/sample/page-3"] > .MuiListItemText-root > .MuiTypography-root');
    cy.get('.css-1o7fyxv').contains('Jane Doe');
  });
});

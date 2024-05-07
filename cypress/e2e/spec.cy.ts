describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('displays an error message for invalid email format on submit', () => {
    cy.get('input[type="email"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('メールアドレスの形式が不正です。').should('be.visible');
  });

  it('does not display an error message for valid email format on submit', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('メールアドレスの形式が不正です。').should('not.exist');
  });

  it('displays an error message for invalid password format on submit', () => {
    cy.get('input[type="password"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('パスワードは8文字以上で入力してください。').should('be.visible');
  });

  it('does not display an error message for valid password format on submit', () => {
    cy.get('input[type="password"]').type('testtest');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('パスワードは8文字以上で入力してください。').should('not.exist');
  });
});

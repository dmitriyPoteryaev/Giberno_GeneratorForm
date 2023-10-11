describe("Fill of form", () => {
  it("Fill of all inputs", () => {
    // переходит сразу по конкретной ссылке
    cy.visit("/test/formgen?key_gen=5d60d33f-5251-4b19-8925-56d757a3cb20");

    cy.findByText("Ожидайте, скоро появится Ваш заказ!").then(() => {
      // cy.findAllByPlaceholderText(/Тип договора/i).type("1488wefwewefwefeffeefeaFЗдесь будет что-то ")

      cy.findAllByPlaceholderText(/Email клиента для чека/i).type("123.12");

      cy.findAllByPlaceholderText(/Тип договора/i).click();
      cy.findAllByText(/Сбер ипотека/i).click();

      cy.findAllByPlaceholderText(/ID договора страхования/i).type("123.12");

      cy.findAllByPlaceholderText(/Сумма/i).type("123.12");
 

 
    });

    // cy.get(".CustomSelect").should('exist');
    // cy.get(".CustomSelect").
    // findByText('Сбер - Ипотека - Титульная').click();
    // cy.findByText(/Сбер - Ипотека - Титульная/i).click();

    // cy.findAllByPlaceholderText(/Email клиента для чека/i).type("dim@yandex.ru");

    // cy.findAllByPlaceholderText(/Тип договора/i).click();

    // cy.get(".CustomSelect").should('exist');
    // cy.get(".CustomSelect").
    // findByText('Сбер - Ипотека - Титульная').click();

    // cy.findByText("Сформировать оплату").click();

    // Нажимает на кнопку
    // переход на страницу с резульатом
  });
});

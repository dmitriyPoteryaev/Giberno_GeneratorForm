describe("Fill of form", () => {
  it("Fill of all inputs", () => {
    // переходит сразу по конкретной ссылке
    cy.visit("/test/formgen?key_gen=5d60d33f-5251-4b19-8925-56d757a3cb20");

    cy.findByText("Ожидайте, скоро появится Ваш заказ!").then(() => {
      cy.findAllByPlaceholderText(/Email клиента для чека/i).type("dim@yandex.ru");

      cy.findAllByPlaceholderText(/Тип договора/i).click();
      cy.findAllByText(/Сбер ипотека/i).click();

      cy.findAllByPlaceholderText(/ID договора страхования/i).type("123.12");

      cy.findAllByPlaceholderText(/Сумма/i).type("123.12");

      cy.findByText(/Сформировать оплату/i).click();
    });

    cy.findByText("Ожидайте, скоро появится Ваш заказ!").then(() => {
      cy.findByText(/Счет успешно сформирован!/i);
    });
  });
});

import { checkValidMail } from "@utils/checkValidMail";

describe("Тестирование валидности e-mail", () => {
  test("e-mail введён не корректно. Поле обязательно", () => {
    expect(checkValidMail(true, "1")).toBe(false);
  });
  test("e-mail введён корректно. Поле обязательно", () => {
    expect(checkValidMail(true, "mymail@mail.ru")).toBe(true);
  });
  test("e-mail ничего не введено. Поле необязательно", () => {
    expect(checkValidMail(false, "")).toBe(true);
  });
  test("e-mail введён не корректно. Поле необязательно", () => {
    expect(checkValidMail(false, "1")).toBe(false);
  });
  test("e-mail введён корректно. Поле необязательно", () => {
    expect(checkValidMail(false, "mymail@mail.ru")).toBe(true);
  });
});

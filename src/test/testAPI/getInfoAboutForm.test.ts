import { formAPI } from "@api/getInfoAboutForm";
import axios from "axios";

const { getInfoAboutForm } = formAPI;

// jest.mock("axios");

describe("Тестирование endpoint. Получение информация для заполнения формы", () => {
  // let MockResponse: any;

  beforeEach(() => {});
  test("Получение данных по ключу - 48acf988-686f-4be4-bc36-82bf827c3b61", async () => {
    // (axios.get as jest.Mock).mockReturnValue(MockResponse);
    const result: any = await getInfoAboutForm(
      "48acf988-686f-4be4-bc36-82bf827c3b61"
    );
    expect(result).toMatchSnapshot();
    expect(result.positionType).toBe("LIST");
  });
  test("Получение данных по ключу - 5d60d33f-5251-4b19-8925-56d757a3cb20", async () => {
    // (axios.get as jest.Mock).mockReturnValue(MockResponse);
    const result: any = await getInfoAboutForm(
      "5d60d33f-5251-4b19-8925-56d757a3cb20"
    );
    expect(result).toMatchSnapshot();
    expect(result.positionType).toBe("MANUAL_LIST");
  });
  test("Получение данных по ключу - da55122e-413b-4810-a565-93de82471ebc", async () => {
    // (axios.get as jest.Mock).mockReturnValue(MockResponse);
    const result: any = await getInfoAboutForm(
      "da55122e-413b-4810-a565-93de82471ebc"
    );
    expect(result).toMatchSnapshot();
    expect(result.employeeName).toBe("Воронцов А. Р.");
  });
});

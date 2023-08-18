import axios from "axios";

export const getInfoAboutForm = async (keyGen: string): Promise<any> => {
  try {
    const res = await axios.get(
      `https://stage.giberno.ru:20000/test/formgen/?key_gen=${keyGen}`
    );

    return res;
  } catch (e) {}
};

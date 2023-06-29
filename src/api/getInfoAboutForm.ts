import axios from "axios";

const getInfoAboutForm = (key_gen: string) => {
  return axios
    .get(`https://api.giberno.ru/formgen/`, {
      params: {
        key_gen: key_gen,
      },
    })
    .then((response: any) => {
      if (response.status !== 200) {
        return "Что пошло не так! Перезагрузите страницу";
      }
      return {
        config: response.config.params,
        infoForm: response.data.data,
      };
    })
    .catch((err) => {
      return err.message;
    });
};

export const formAPI = {
  getInfoAboutForm,
};

import api from "./index";
import { transformToParamsString } from "./utils/apiUtils";
const token =
  "?token=e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";
const path = "tasks";
//Note:Se crean los metods CRUD que se utilizaran a lo largo del proyecto
export default {
  async gets(payload) {
    //Note: en el objeto config se pueden meter los heders por si fuera necesario utilizar otro metodo de autentificacion en un metodo en especifico
    var config = {};
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .get(`${path}${payload.path}${query}${token}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async posts(payload) {
    var config = {
      /* headers: {
        common: {
          Authorization:
            "Bearer " +
            "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }, */
    };
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .post(`${path}${query}${token}`, payload.data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async deletes(payload) {
    var config = {};
    return new Promise((resolve, reject) => {
      api
        .delete(`${path}${payload.path}${token}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async puts(payload) {
    var config = {};
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .put(`${path}${payload.path}${query}${token}`, payload.data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

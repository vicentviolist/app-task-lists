import api from "./index";
import { transformToParamsString } from "./utils/apiUtils";

const path = "tasks";

export default {
  async gets(payload) {
    var config = {};
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .get(`${path}${query}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async post(path, payload) {
    let config = {};
    let query = "";
    if (payload) {
      query = transformToParamsString(payload.query);
    }
    return new Promise((resolve, reject) => {
      api
        .post(path, payload, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

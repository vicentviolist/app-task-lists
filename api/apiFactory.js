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
        .get(`${path}${payload.path}${query}`, config)
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
      headers: {
        common: {
          Authorization:
            "Bearer " +
            "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: [
          function (data) {
            const params = new URLSearchParams();
            for (const key in data) {
              params.append(key, data[key]);
            }
            return params.toString();
          },
        ],
      },
    };
    let { query } = payload;
    query = transformToParamsString(query);
    return new Promise((resolve, reject) => {
      api
        .post(`${path}${query}`, payload.data, config)
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
      console.log(payload, "payload.path");
      api
        .delete(`${path}${payload.path}`, config)
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
        .put(`${path}${payload.path}${query}`, payload.data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

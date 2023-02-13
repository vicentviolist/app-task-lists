import apiFactory from "../apiFactory";

let path = "/auth/";

export function login(payload) {
  return apiFactory.post(path + "login", payload);
}

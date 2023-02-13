import apiFactory from "../apiFactory";

export function getTask(payload) {
  return apiFactory.gets(payload);
}
export function addTask(payload) {
  return apiFactory.post(payload);
}

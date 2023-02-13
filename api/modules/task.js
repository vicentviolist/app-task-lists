import apiFactory from "../apiFactory";

export function getTask(payload) {
  return apiFactory.gets(payload);
}
export function addTask(payload) {
  return apiFactory.posts(payload);
}
export function deleteTask(payload) {
  return apiFactory.deletes(payload);
}

export function updateTask(payload) {
  return apiFactory.puts(payload);
}

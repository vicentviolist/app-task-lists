import { getTask, addTask, deleteTask, updateTask } from "/api/modules/task";

export const state = () => ({
  task: [],
});

export const mutations = {
  settask(state, task) {
    state.task = task;
  },
};

export const actions = {
  async getTaskData({ commit }, payload) {
    const response = await getTask(payload);
    console.log(response, "response");
    commit("settask", response.data);
  },
  async getTaskId({ commit }, payload) {
    const res = await getTask(payload);
    return res;
  },
  async addTask({ commit }, payload) {
    const res = await addTask(payload);
    return res;
  },
  async deleteTask({ commit }, payload) {
    const res = await deleteTask(payload);
    return res;
  },
  async updateTask({ commit }, payload) {
    const res = await updateTask(payload);
    return res;
  },
};

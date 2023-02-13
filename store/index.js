import { getTask } from "/api/modules/task";
import { addTask } from "/api/modules/task";

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
};

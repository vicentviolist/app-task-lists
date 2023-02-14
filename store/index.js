import { getTask, addTask, deleteTask, updateTask } from "/api/modules/task";

export const state = () => ({
  //Note: variable que poblara de informacion la tabla
  task: [],
});

export const mutations = {
  //Note: Se muta la variable task con la data que vendra como resultado en la peticion
  settask(state, task) {
    state.task = task;
  },
};

export const actions = {
  //Note: peticion que traera la consulta que llena la tabla
  async getTaskData({ commit }, payload) {
    let res = await getTask(payload);
    commit("settask", res.data);
  },
  //Note: traera registro uno a uno para llenar inf de detalle
  async getTaskId({ commit }, payload) {
    const res = await getTask(payload);
    return res;
  },
  //Note: api que se utiliza para la creacion de tareas
  async addTask({ commit }, payload) {
    const res = await addTask(payload);
    return res;
  },
  //Note: esta api borrara los items
  async deleteTask({ commit }, payload) {
    const res = await deleteTask(payload);
    return res;
  },
  //Note: actualizar un registro en especifico
  async updateTask({ commit }, payload) {
    const res = await updateTask(payload);
    return res;
  },
};

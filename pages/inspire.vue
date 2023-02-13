<template>
  <v-row>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="task"
      class="elevation-1"
    >
      <template v-slot:item.id="item">
        <v-chip
          class="ma-2"
          color="primary"
          outlined
          style="cursor: pointer"
          @click="editTask(item.item.id)"
        >
          <div class="mr-2">Editar</div>
          <v-icon small color="primary darken-2"> mdi-eye </v-icon>
        </v-chip>
      </template>
      <template v-slot:item.is_completed="item">
        <div class="mr-2">
          {{ item.item.is_completed == 1 ? "Completed" : "Incompleted" }}
        </div>
      </template>
    </v-data-table>
    <button @click="createTask">createTask</button>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InspirePage",
  components: {},
  data() {
    return {
      loading: false,
      headers: [
        { text: "title", align: "start", value: "title" },
        { text: "due_date", align: "start", value: "due_date" },
        {
          text: "is_completed",
          align: "start",
          value: "is_completed",
        },
        {
          text: "id",
          align: "start",
          value: "id",
        },
      ],
      filterData: {
        title: "Prueba 1",
        is_completed: 0,
        due_date: "2023/02/13",
        comments: "Probando el api",
        description: "Probando el api",
        tags: "Prueba api",
      },
    };
  },
  created() {
    //Note: se ejecuta al cargar la pagina para llenar la lista de tareas ya existentes
    this.asyncData();
  },
  computed: {
    ...mapState(["task"]),
  },
  methods: {
    // Note: Esta sera la busqueda inicial que traera todas las tareas registradas hasta el momento
    async asyncData() {
      let query = {};
      await this.$store.dispatch("getTaskData", { query });
      console.log(this.task, "task");
    },
    async editTask(id) {
      let query = { task_id: id };
      let res = await this.$store.dispatch("getTaskId", { query });
      console.log(res, "res");
    },
    async createTask(id) {
      /* let payload = {
        query: { title: this.filterData.title },
      }; */
      let query = { title: this.filterData.title };
      let res = await this.$store.dispatch("addTask", { query });
      console.log(res, "res");
    },
  },
};
</script>

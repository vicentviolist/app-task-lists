<template>
  <div>
    <v-row>
      <v-col class="mt-2">
        <v-btn @click="dialog = true" color="primary darken-2">Add task</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
              @click="detailTask(item.item.id)"
            >
              <div class="mr-2">Edit</div>
              <v-icon small color="primary darken-2"> mdi-eye </v-icon>
            </v-chip>
          </template>
          <template v-slot:item.is_completed="item">
            <div class="mr-2">
              {{ item.item.is_completed == 1 ? "Completed" : "Incomplete" }}
            </div>
          </template>
        </v-data-table>
      </v-col>

      <v-dialog v-model="dialog" scrollable width="auto" persistent>
        <v-card>
          <v-card-title>Edit task</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px">
            <v-form ref="formTask" @submit.prevent>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      solo
                      v-model="filterData.title"
                      :rules="rulesRequired"
                      label="Title"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      solo
                      v-model="filterData.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          solo
                          v-model="filterData.due_date"
                          label="Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="filterData.due_date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(filterData.due_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      solo
                      v-model="filterData.tags"
                      label="Tags"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      solo
                      v-model="filterData.comments"
                      label="Comments"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="filterData.is_completed"
                      label="Completed"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider> </v-divider>
          <v-card-actions class="d-flex justify-space-between">
            <div>
              <v-btn
                color="red"
                variant="text"
                @click="confirmDelete()"
                v-if="isEdit"
              >
                Delete
              </v-btn>
            </div>
            <div>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeDetail()"
              >
                Close </v-btn
              ><v-btn
                color="primary darken-2"
                class="ml-3"
                variant="text"
                @click="submit()"
              >
                Save
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="deleteConfirm" width="auto">
          <v-card>
            <v-card-title> The task will be deleted </v-card-title>
            <v-card-text> Confirm?</v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                variant="text"
                @click="deleteConfirm = false"
              >
                Cancel
              </v-btn>
              <v-btn color="primary" variant="text" @click="deleteTask()">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-dialog>
      <v-snackbar v-model="snackbar" multi-line :color="colorAlert">
        {{ textAlert }}
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InspirePage",
  components: {},
  data() {
    return {
      loading: false,
      isEdit: false,
      headers: [
        { text: "Title", align: "start", value: "title" },
        { text: "Due date", align: "start", value: "due_date" },
        {
          text: "Complete",
          align: "start",
          value: "is_completed",
        },
        {
          text: "Edit",
          align: "start",
          value: "id",
        },
      ],
      rulesRequired: [
        (value) => {
          if (value) return true;

          return "Value is requred.";
        },
      ],
      snackbar: false,
      idTask: null,
      filterData: {},
      filterDataAux: {
        title: null,
        is_completed: false,
        due_date: null,
        comments: null,
        description: null,
        tags: null,
      },
      dialog: false,
      deleteConfirm: false,
      textAlert: "",
      menu: false,
      colorAlert: "success",
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
      try {
        this.loading = true;
        let payload = { query: {}, path: "" };
        await this.$store.dispatch("getTaskData", payload);
        console.log(this.task, "task");
      } catch (error) {
        this.colorAlert = "error";
        this.snackbar = true;
        this.textAlert = error;
      } finally {
        this.loading = false;
      }
    },
    async detailTask(id) {
      try {
        this.isEdit = true;
        this.idTask = id;
        let payload = { query: {}, path: "/" + this.idTask };
        let res = await this.$store.dispatch("getTaskId", payload);
        this.filterData = { ...res.data[0] };
        this.dialog = true;
      } catch (error) {
        this.colorAlert = "error";
        this.snackbar = true;
        this.textAlert = error;
      }
    },
    confirmDelete() {
      this.deleteConfirm = true;
    },
    async deleteTask() {
      try {
        console.log(this.idTask, "this.idTask ");
        let payload = { path: "/" + this.idTask };
        let res = await this.$store.dispatch("deleteTask", payload);
        this.colorAlert = "success";
        this.snackbar = "The task was successfully deleted";
        this.textAlert = error;
      } catch (error) {
        this.colorAlert = "error";
        this.snackbar = true;
        this.textAlert = error;
      } finally {
        this.asyncData();
      }
    },
    closeDetail() {
      //Note al cerrar la modal reinicia los valores originales de los inputs
      this.dialog = false;
      this.idTask = false;
      this.isEdit = false;
      this.filterData = this.filterDataAux;
    },
    async submit() {
      try {
        // Note: se envian todos los parametros dentro del v-model de la creacion de tareas para optenerla una vez consumimos su API
        let payload = {
          data: { ...this.filterData },
        };
        if (this.isEdit) {
          // Note: dentro de payload se envia el path y data para hacer el put de forma correcta
          // Utilizamos el id de la tarea que declaramos en this.idTask al momento de abrir el detalle de esta
          // Solo entrara cuando estemos en modo edicion de tareas
          payload = {
            data: { ...this.filterData },
            path: "/" + this.idTask,
          };
          await this.$store.dispatch("updateTask", payload);
          this.colorAlert = "success";
          this.snackbar = true;
          this.textAlert = "The task was updated successfully";
        } else if (!this.isEdit) {
          await this.$store.dispatch("addTask", payload);
          this.colorAlert = "success";
          this.snackbar = true;
          this.textAlert = "The task was created successfully";
        }
      } catch (error) {
        this.colorAlert = "error";
        this.snackbar = true;
        this.textAlert = error;
      } finally {
        this.closeDetail();
        this.asyncData();
      }
    },
  },
};
</script>

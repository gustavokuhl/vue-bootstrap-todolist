<template>
  <div class="container mt-2">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="mb-2 accordion"
      role="tablist"
    >
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            v-b-toggle="'accordion-' + index"
            variant="outline-dark"
            >{{ task.subject }}</b-button
          >
        </b-card-header>
        <b-collapse
          :id="'accordion-' + index"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>{{ task.description }}</b-card-text>
            <b-button
              variant="outline-secondary"
              class="mr-2"
              @click="edit(index)"
            >
              Editar
            </b-button>
            <b-button
              variant="outline-danger"
              class="mr-2"
              @click="remove(task, index)"
            >
              Excluir
            </b-button>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block">
        Deseja realmente excluir a tarefa
        <strong>{{ taskSelected.subject }}</strong
        >?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveTask"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin";
export default {
  name: "List",

  mixins: [ToastMixin],

  data() {
    return {
      tasks: [],
      taskSelected: [],
    };
  },

  created() {
    this.tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  },

  methods: {
    edit(index) {
      this.$router.push({ name: "form", params: { index } });
    },
    remove(task, index) {
      this.taskSelected = task;
      this.taskSelected.index = index;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    confirmRemoveTask() {
      this.tasks.splice(this.taskSelected.index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.hideModal();
      this.showToast("success", "Sucesso!", "Tarefa excluida com sucesso.");
    },
  },
};
</script>
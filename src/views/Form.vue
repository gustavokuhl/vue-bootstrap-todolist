<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group label="Titulo" label-for="subject">
        <b-form-input
          id="subject"
          v-model="form.subject"
          type="text"
          placeholder="Ex: fazer tarefa"
          required
          autocomplete="off"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Ex: preciso fazer a tarefa"
          required
          autocomplete="off"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" @click="saveTask"
        >Salvar</b-button
      >
    </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin";
export default {
  name: "Form",

  mixins: [ToastMixin],

  data() {
    return {
      form: {
        subject: "",
        description: "",
      },
      methodSave: "new",
    };
  },

  created() {
    if (Number.isInteger(this.$route.params.index)) {
      this.methodSave = "update";
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.form = tasks[this.$route.params.index];
    }
  },

  methods: {
    saveTask() {
      let tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];

      if (this.methodSave === "new") {
        tasks.push(this.form);
        this.showToast("success", "Sucesso!", "Tarefa criada com sucesso.");
      } else if (this.methodSave === "update") {
        tasks[this.$route.params.index] = this.form;
        this.showToast("success", "Sucesso!", "Tarefa atualizada com sucesso.");
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.$router.push({ name: "list" });
    },
  },
};
</script>

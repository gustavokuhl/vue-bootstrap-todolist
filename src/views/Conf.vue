<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group label="Tipo de visualização" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="btn-radios-1"
          v-model="form.viewType"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="radios-btn-default"
          buttons
        ></b-form-radio-group>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" @click="saveConf">
        Salvar
      </b-button>
    </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin";
export default {
  name: "Conf",

  mixins: [ToastMixin],

  data() {
    return {
      form: {
        viewType: 0,
      },
      options: [
        { text: "Card", value: 1 },
        { text: "Accordion", value: 2 },
        { text: "Split Card", value: 3 },
      ],
    };
  },

  created() {
    if (localStorage.getItem("conf")) {
      const confs = JSON.parse(localStorage.getItem("conf"));
      this.form.viewType = confs.viewType;
    }
  },

  methods: {
    saveConf() {
      localStorage.setItem("conf", JSON.stringify(this.form));
      this.showToast("success", "Sucesso!", "Configuração salva com sucesso.");
      this.$router.push({ name: "list" });
    },
  },
};
</script>

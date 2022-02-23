<template>
  <div class="container mt-2">
    <div v-if="list_type === TYPE_NORMAL_CARD">
      <list-card />
    </div>
    <div v-else-if="list_type === TYPE_ACCORDION">
      <list-accordion />
    </div>
    <div v-else-if="list_type === TYPE_SPLIT_CARD">
      <list-card-group />
    </div>
    <div v-else>
      <p>ViewType inválida</p>
    </div>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin";
import ListCard from "./ListCard.vue";
import ListCardGroup from "./ListCardGroup.vue";
import ListAccordion from "./ListAccordion.vue";

export default {
  name: "List",

  mixins: [ToastMixin],

  components: {
    ListCard,
    ListCardGroup,
    ListAccordion,
  },

  data() {
    return {
      list_type: this.getListType(),
    };
  },

  methods: {
    getListType() {
      const confs = JSON.parse(localStorage.getItem("conf"));
      return confs ? confs.viewType : this.$router.push({ name: "conf" });
    },
  },

  created() {
    this.TYPE_NORMAL_CARD = 1;
    this.TYPE_ACCORDION = 2;
    this.TYPE_SPLIT_CARD = 3;
  },
};
</script>
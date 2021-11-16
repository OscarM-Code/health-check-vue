<template>
  <form id="categoryForm" @submit.prevent="addCategory" method="POST">
    <h2>Add category</h2>
    <label for="getName">Enter the name for the new category</label>
    <input type="text" id="getName" placeholder="Name here" v-model="nameC" />
    <button>Add +</button>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "formAdd",
  data() {
    return {
      nameC: null
    };
  },
  methods: {
    addCategory() {
      let data = {
        name: this.nameC,
      };
      fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (r) => {
            this.$store.commit("incrementAllLinks", r);
            this.toast("Category Create.", "success");
        })
        .catch((e) => this.toast("An error was occured.", "danger"));
    }
  },
  setup() {
    const toast = (message, type) => {
      createToast(message, {
        position: "top-right",
        timeout: 3000,
        type: type,
        showIcon: true,
      });
    };
    return { toast };
  },
};
</script>

<style>

#categoryForm button {
  padding: 0 1rem;
}

</style>

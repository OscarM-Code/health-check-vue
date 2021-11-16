<template>
  <form id="linkForm" @submit.prevent="addLink" method="POST">
    <h2>Add Link<link rel="stylesheet" href="" /></h2>
    <label for="getLink"
      >Enter the link and the method that you want to add.</label
    >
    <input type="text" id="getLink" placeholder="Link here" v-model="link" />
    <div>
      <label for="methid">Method:</label>
      <select name="method" v-model="method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="DELETE">DELETE</option>
        <option value="PUT">PUT</option>
      </select>
      <label for="category">Category:</label>
      <select name="category" v-model="category">
        <option v-for="list in this.categories" :key="list" :value="list.id">{{
          list.name[0].toUpperCase() + list.name.slice(1)
        }}</option>
      </select>
    </div>
    <button>Add +</button>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "formAdd",
  props: ['categories'],
  data() {
    return {
      link: null,
      method: "GET",
      category: this.categories[0].id,
    };
  },
  methods: {
    addLink() {
      let data = {
        link: this.link,
        method: this.method,
        statusCode: 200,
        health: true,
        category: this.category,
      };
      fetch("https://warm-inlet-55236.herokuapp.com/api/links", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((r) => {
            this.toast("Link added.", "success");
        })
        .catch((e) => {
          this.toast("An error was occured", "danger");
          console.log(e)
          });
    },
  },
  setup() {
    const toast = (message, type) => {
      createToast(message, {
        position: "top-right",
        timeout: 5000,
        type: type,
        showIcon: true,
      });
    };
    return { toast };
  },
};
</script>

<style>

#linkForm input {
  width: 60%;
}

#linkForm button {
  margin-top: 2rem;
  padding: 0 1rem;
}

#linkForm div select {
  font-size: 1.5rem;
  width: 8rem;
  margin: 0 1rem;
}

#linkForm div > label {
  font-size: 1.5rem;
}
</style>

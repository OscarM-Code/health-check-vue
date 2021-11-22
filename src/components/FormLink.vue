<template>
  <form id="linkForm" @submit.prevent="addLink" method="POST" ref="addLink">
    <div @click="toggleLinkForm">
      <h2>Add Link<link rel="stylesheet" href="" /></h2>
      <img src="../assets/img/dropDown.png" ref="btnAddLink">
    </div>
    <div>
    <div>
      <label for="getLink">Enter the link and the method that you want to add.</label>
      <input type="text" id="getLink" placeholder="Link here" v-model="link" />
    </div>
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
    </div>
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
      fetch("http://warm-inlet-55236.herokuapp.com/api/links", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
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
    toggleLinkForm(){
      this.$refs.addLink.classList.toggle('active');
      this.$refs.btnAddLink.classList.toggle('active');
    }
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

#linkForm > div
{
  width: 100%;
  display: flex;
}

#linkForm > div:nth-child(2)
{
    flex-wrap: wrap;
    justify-content: space-between;
}

#linkForm > div > *
{
  margin: 2rem;
}

#linkForm > div > div:nth-child(1n+1)
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  margin-bottom: 0;
}

#linkForm > div > div:nth-child(2) select
{
  margin-bottom: 2rem;
}

#linkForm input {
  width: 60%;
}

#linkForm button {
  height: 3rem;
  padding: 0 1rem;
}

</style>

<template>
  <form id="linkForm" @submit.prevent="addLink" method="POST" ref="addLink">
    <loader
      class="loader"
      v-if="loading"
      object="#ffffff"
      color1="#77c207"
      color2="#2c2c2c"
      size="11"
      speed="1.5"
      bg="#343a40"
      objectbg="#999793"
      opacity="80"
      name="circular"
    ></loader>
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
      loading: false
    };
  },
  methods: {
    addLink() {
      this.loading = true;
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
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((r) => {
          if(r.status && r.status === 400) {
            this.loading = false;
            this.toast(r.message, "warning");
          } else if (r.status && r.status === 200) {
            this.toast("Link added.", "success");
            this.loading = false;
          } else {
            this.loading = false;
            this.toast("Something went wrong.", "danger");
          }
        })
        .catch((e) => {
          this.loading = false;
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
    align-items: flex-end;
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

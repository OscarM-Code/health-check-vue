<template>
  <form ref="addCat" id="categoryForm" @submit.prevent="addCategory" method="POST">
    <div @click="toggleCatForm">
      <h2>Add category</h2>
      <img src="../assets/img/dropDown.png" ref="btnAddCat">
    </div>
    <div>
        <div>
          <label for="getName">Enter the name for the new category</label>
          <input type="text" id="getName" placeholder="Name here" v-model="nameC" />
        </div>
      <button>Add +</button>
    </div>
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
      fetch("http://warm-inlet-55236.herokuapp.com/api/categories", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (r) => {
            this.$store.commit("incrementAllLinks", r);
            this.toast("Category Create.", "success");
        })
        .catch((e) => this.toast("An error was occured.", "danger"));
    },
    toggleCatForm(){
      this.$refs.addCat.classList.toggle('active');
      this.$refs.btnAddCat.classList.toggle('active');
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

#categoryForm > div > *
{
  margin: 2rem;
}

#categoryForm > div:nth-child(2) > div
{
  display: flex;
  flex-direction: column;
  justify-content: start;
}

#categoryForm > div:nth-child(2)
{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

#categoryForm button {
  height: 3rem;
  padding: 0 1rem;
}

</style>

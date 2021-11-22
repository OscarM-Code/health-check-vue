<template>
  <form id="catDeleteForm" @submit.prevent="modDelCategory" method="POST" ref="delCat">
    <div @click="toggleCatDelForm">
      <h2>Modify or delete category</h2>
      <img src="../assets/img/dropDown.png" ref="btnDelCat">
    </div>
    <label for="getName"
      >Choose the category and if you want to delete or modify.</label
    >
    <div>
      <label for="category">Category:</label>
      <select name="category" v-model="category" @change="newName = this.categories.find((i) => i.id === category).name">
      <option v-for="list in this.categories" :key="list" :value="list.id">{{
        list.name[0].toUpperCase() + list.name.slice(1)
      }}</option>
    </select>
      <label for="delormod">Action:</label>
      <select name="delormod" v-model="action">
        <option value="PUT">Modify</option>
        <option value="DELETE">Delete</option>
      </select>
    </div>
    <label v-if="action === 'PUT'">Change name here:</label>
    <input v-if="action === 'PUT'" type="text" v-model="newName" />
    <button>Validate</button>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "formAdd",
  props: ['categories'],
  data() {
    return {
      category: this.categories[0].id,
      action: "PUT",
      newName: this.categories[0].name,
      userData: VueJwtDecode.decode(localStorage.getItem("token"))
    };
  },
  methods: {
    modDelCategory() {
      let data = {
        name: this.newName
      };
      fetch(`http://warm-inlet-55236.herokuapp.com/api/user/${this.userData.userId}/categories/${this.category}`, {
        method: this.action,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (r) => {      
          if(this.action === "DELETE"){
            if(r.message === "Category deleted."){
              this.$store.commit("deleteAllLinks", this.category);
              this.toast(r.message, "success");
              this.category = "618511ce4efdc576ee585e52";
              }else{
                this.toast(r.message, "danger")
              }
          } else if(this.action === "PUT"){
            if(r.message === "Category name modified."){
                this.$store.commit("modifyAllLinks", {cat: this.category, name: this.newName});
                this.toast(r.message, "success")
              }else{
                this.toast(r.message, "danger")
              }
          }

        })
        .catch((e) => console.log(e));
    },
    toggleCatDelForm(){
      this.$refs.delCat.classList.toggle('active');
      this.$refs.btnDelCat.classList.toggle('active');
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
  mounted() {
    
  },
};
</script>

<style>

#catDeleteForm input {
  margin-top: 0 !important;
  width: 60%;
}

#catDeleteForm div select {
  font-size: 1.5rem;
  width: 8rem;
  margin: auto 1rem;
}

#catDeleteForm div > label {
  font-size: 1.5rem;
}

#catDeleteForm button {
  padding: 0 1rem;
}

#catDeleteForm > select {
  width: 65%;
  margin-bottom: 2rem;
}

</style>

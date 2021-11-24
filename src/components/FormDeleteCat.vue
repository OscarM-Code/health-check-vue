<template>
  <form id="catDeleteForm" @submit.prevent="modDelCategory" method="POST" ref="delCat">
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
    <div @click="toggleCatDelForm">
      <h2>Modifier ou supprimer une catégorie</h2>
      <img src="../assets/img/dropDown.png" ref="btnDelCat">
    </div>
    <section>
    <div>
    <label for="getName">Choisissez une catégorie et l'action à effectuer.</label>
    <div>
      <label for="category">Categorie:</label>
      <select name="category" v-model="category" @change="newName = this.categories.find((i) => i.id === category).name">
      <option v-for="list in this.categories" :key="list" :value="list.id">{{
        list.name[0].toUpperCase() + list.name.slice(1)
      }}</option>
    </select>
      <label for="delormod">Action:</label>
      <select name="delormod" v-model="action">
        <option value="PUT">Modifier</option>
        <option value="DELETE">Supprimer</option>
      </select>
    </div>
    <label v-if="action === 'PUT'">Changez le nom ici:</label>
    <input v-if="action === 'PUT'" type="text" v-model="newName" />
    </div>
    <button>Valider</button>
    </section>
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
      userData: VueJwtDecode.decode(localStorage.getItem("token")),
      loading: false
    };
  },
  methods: {
    modDelCategory() {
      let data = {
        name: this.newName
      };
      if (this.newName !== this.categories.find((i) => i.id === this.category).name || this.action === "DELETE") {
        this.loading = true;
        fetch(`https://warm-inlet-55236.herokuapp.com/api/user/${this.userData.userId}/categories/${this.category}`, {
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
            this.loading = false
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
          .catch((e) => {
            console.log(e)
            this.loading = false;
            this.toast("Une erreur est survenue.", "danger")
            });
      } else {
        this.toast("Les deux nom sont identiques !", "danger")
      }
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
  width: 60%;
}

#catDeleteForm button {
  padding: 0 1rem;
  height: 3rem;
}

#catDeleteForm > section
{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
}

#catDeleteForm > section > div
{
  width: 70%;
  display: flex;
  flex-direction: column;
}

#catDeleteForm > section > div > div
{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#catDeleteForm > section > *,
#catDeleteForm > div > *
{
  margin: 2rem;
}

#catDeleteForm > section div > label
{
  margin-top: 2rem;
}

</style>

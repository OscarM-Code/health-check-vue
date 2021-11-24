<template>
  <form ref="addCat" id="categoryForm" @submit.prevent="addCategory" method="POST">
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
    <div @click="toggleCatForm">
      <h2>Ajouter une catégorie</h2>
      <img src="../assets/img/dropDown.png" ref="btnAddCat">
    </div>
    <div>
        <div>
          <label for="getName">Entrez le nom pour la nouvelle catégorie</label>
          <input type="text" id="getName" placeholder="Nom ici" v-model="nameC" />
        </div>
      <button>Ajouter</button>
    </div>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "formAdd",
  data() {
    return {
      nameC: null,
      loading: false
    };
  },
  methods: {
    addCategory() {
      let data = {
        name: this.nameC,
      };
      if (this.nameC) {
        this.loading = true
        fetch("https://warm-inlet-55236.herokuapp.com/api/categories", {
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
            if (r.status && r.status === 400) {
              this.toast(r.message, "warning");
              this.loading = false
            }else if (r.status && r.status === 200) {
              this.$store.commit("incrementAllLinks", r.cat);
              this.toast("Category créée", "success");
              this.loading = false
            } else {
              this.toast("Une erreur est survenue.", "error");
              this.loading = false
            }
          })
          .catch((e) => {
            this.toast("Une erreur est survenue.", "danger")
            this.loading = false
            });
      } else {
        this.toast("Le nom est vide", "warning")
      }
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
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;
}

#categoryForm button {
  height: 3rem;
  padding: 0 1rem;
}

</style>

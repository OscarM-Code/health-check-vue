<template>
  <form id="deleteLinkForm" method="POST" @submit.prevent="use" ref="delLink">
    <div @click="toggleDelLinkForm">
      <h2>Modifier ou supprimer un lien</h2>
      <img src="../assets/img/dropDown.png" ref="btnDelLink" />
    </div>
    <section>
      <div>
      <label for="getName">Choisir une catégorie, séléctionner un lien, choix de l'actions, modifications des paramètres voulus.</label>
      <div>
        <label for="category">Category:</label>
        <select name="category" v-model="category" @change="selectLink">
          <option
            v-for="list in this.categories"
            :key="list"
            :value="list.id"
            >{{ list.name[0].toUpperCase() + list.name.slice(1) }}</option
          >
        </select>
        <label for="delormod">Action:</label>
        <select name="delormod" v-model="action">
          <option value="PUT">Modifier</option>
          <option value="DELETE">Supprimer</option>
        </select>
      </div>
      <label for="allLink">Selectionnez le lien:</label>
      <select name="allLink" v-model="selectedLink" @change="changeData">
        <option v-for="link in allLinks" :key="link.link" :value="link._id">{{
          link.link + " (" + link.method + ")"
        }}</option>
      </select>
      <div v-if="action === 'PUT'">
        <label for="method">Nouvelle méthode:</label>
        <select name="method" v-model="method">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
        <label for="newCat">Nouvelle catégorie</label>
        <select name="newCat" v-model="newCat">
          <option
            v-for="list in this.categories"
            :key="list"
            :value="list.id"
            >{{ list.name[0].toUpperCase() + list.name.slice(1) }}</option
          >
        </select>
      </div>
      <label v-if="action === 'PUT'">Changez le lien ici:</label>
      <input v-if="action === 'PUT'" type="text" v-model="newLink" />
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
  props: ["categories"],
  data() {
    return {
      category: this.categories[0].id,
      action: "PUT",
      newLink: "",
      allLinks: [],
      selectedLink: null,
      method: null,
      newCat: null,
      userData: VueJwtDecode.decode(localStorage.getItem("token")),
      loading: false
    };
  },
  methods: {
    selectLink() {
      fetch(
        `https://warm-inlet-55236.herokuapp.com/api/user/${this.userData.userId}/categories/${this.category}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then(async (r) => {
          this.allLinks = r.sites;
          this.newLink = r.sites[0]
            ? r.sites[0].link
            : "Cette catégorie est vide";
          this.selectedLink = r.sites[0]
            ? r.sites[0]._id
            : "Cette catégorie est vide";
          this.method = r.sites[0] ? r.sites[0].method : "GET";
          this.newCat = this.category;
        })
        .catch((e) => {
          console.log(e);
          this.toast("Une erreur est survenue.", "danger");
        });
    },
    toggleDelLinkForm() {
      this.$refs.delLink.classList.toggle("active");
      this.$refs.btnDelLink.classList.toggle("active");
    },
    changeData() {
      let index = this.allLinks.find((l) => l._id === this.selectedLink);
      this.method = index.method;
      this.newLink = index.link;
    },
    delModLink() {
      let index = this.allLinks.find((l) => l._id === this.selectedLink);
      let data = {
        category: this.category,
        link: this.newLink || null,
        action: this.action,
        method: this.method || null,
        newCategory: this.newCat || null,
      };
      if (
        this.method !== index.method ||
        this.newLink !== index.link ||
        (this.category !== this.newCat && this.action === "PUT") ||
        this.action === "DELETE"
      ) {
        this.$emit("loaded", true);
        fetch(
          `https://warm-inlet-55236.herokuapp.com/api/user/${this.userData.userId}/links/${this.selectedLink}`,
          {
            method: this.action,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then(async (r) => {
            this.$emit("loaded", false);
            if (r.status === 200) {
              this.toast(r.message, "success");
            } else if (r.status === 400) {
              this.toast(r.message, "warning");
            } else {
              this.toast("Une erreur est survenue.", "danger");
            }
            this.changeData();
          })
          .catch((e) => {
            console.log(e);
            this.$emit("loaded", false);
            this.toast("Une erreur est survenue.", "danger");
          });
      } else {
        this.toast("Tous les paramètres sont identiques !", "warning");
      }
    },
    use() {
      this.delModLink();
      this.selectLink();
      this.changeData();
    },
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
  mounted() {
    this.selectLink();
  },
};
</script>

<style>
#deleteLinkForm input {
  width: 60%;
}

#deleteLinkForm button {
  padding: 0 1rem;
  height: 3rem;
}

#deleteLinkForm > section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
}

#deleteLinkForm > section > div {
  width: 70%;
  display: flex;
  flex-direction: column;
}

#deleteLinkForm > section > div > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#deleteLinkForm > section > *,
#deleteLinkForm > div > * {
  margin: 2rem;
}

#deleteLinkForm > section div > label {
  margin-top: 2rem;
}
</style>

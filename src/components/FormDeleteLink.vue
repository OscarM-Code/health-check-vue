<template>
  <form id="deleteLinkForm" method="POST" @submit.prevent="use" ref="delLink" v-if="allLinks.length !== 0">
        <loader
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
    <div @click="toggleDelLinkForm">
      <h2>Modify or delete link</h2>
      <img src="../assets/img/dropDown.png" ref="btnDelLink" />
    </div>
    <section>
      <div>
      <label for="getName"
        >Choose the category, select the link which you want, and select if you
        want to delete or modify. If you want to modify, select the method and
        the category, and change the link. (You can just modify the method, or
        just the category, etc...)</label
      >
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
          <option value="PUT">Modify</option>
          <option value="DELETE">Delete</option>
        </select>
      </div>
      <label for="allLink">Select the link:</label>
      <select name="allLink" v-model="selectedLink" @change="changeData">
        <option v-for="link in allLinks" :key="link.link" :value="link._id">{{
          link.link + " (" + link.method + ")"
        }}</option>
      </select>
      <div v-if="action === 'PUT'">
        <label for="method">New method:</label>
        <select name="method" v-model="method">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
        <label for="newCat">New category</label>
        <select name="newCat" v-model="newCat">
          <option
            v-for="list in this.categories"
            :key="list"
            :value="list.id"
            >{{ list.name[0].toUpperCase() + list.name.slice(1) }}</option
          >
        </select>
      </div>
      <label v-if="action === 'PUT'">Change link here:</label>
      <input v-if="action === 'PUT'" type="text" v-model="newLink" />
      </div>
      <button>Validate</button>
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
            : "This category is empty";
          this.selectedLink = r.sites[0]
            ? r.sites[0]._id
            : "This category is empty";
          this.method = r.sites[0] ? r.sites[0].method : "GET";
          this.newCat = this.category;
        })
        .catch((e) => {
          console.log(e);
          this.toast("An error was occured", "danger");
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
        this.loading = true;
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
            this.loading = false;
            if (r.status === 200) {
              this.toast(r.message, "success");
            } else if (r.status === 400) {
              this.toast(r.message, "warning");
            } else {
              this.toast("An error was occured", "danger");
            }
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
            this.toast("An error was occured", "danger");
          });
      } else {
        this.toast("You try to change with all same parameter", "warning");
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

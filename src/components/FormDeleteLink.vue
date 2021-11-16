<template>
  <form id="deleteLinkForm" method="POST" @submit.prevent="use">
    <h2>Modify or delete link</h2>
    <label for="getName"
      >Choose the category, select the link which you want, and select if you
      want to delete or modify. If you want to modify, select the method and the
      category, and change the link. (You can just modify the method, or just
      the category, etc...)</label
    >
    <div>
      <label for="category">Category:</label>
      <select name="category" v-model="category" @change="selectLink">
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
    <label for="allLink">Select the link:</label>
    <select name="allLink" v-model="selectedLink" @change="changeData">
      <option v-for="link in allLinks" :key="link.link" :value="link._id">{{
        link.link + " (" + link.method + ")"
      }}</option>
    </select>
    <div v-if="action === 'PUT'">
      <label  for="method">New method:</label>
      <select name="method" v-model="method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="DELETE">DELETE</option>
        <option value="PUT">PUT</option>
      </select>
      <label for="newCat">New category</label>
      <select name="newCat" v-model="newCat">
        <option v-for="list in this.categories" :key="list" :value="list.id">{{
          list.name[0].toUpperCase() + list.name.slice(1)
        }}</option>
      </select>
    </div>
    <label v-if="action === 'PUT'">Change link here:</label>
    <input v-if="action === 'PUT'" type="text" v-model="newLink" />
    <button>Validate</button>
  </form>
</template>

<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "formAdd",
    props: ['categories'],
  data() {
    return {
      category: this.categories[0].id,
      action: "PUT",
      newLink: "",
      allLinks: [],
      selectedLink: null,
      method: null,
      newCat: null,
    };
  },
  methods: {
    selectLink() {
      fetch(`http://localhost:3000/api/categories/${this.category}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (r) => {
          if(r.sites.length === 0) {
            this.toast("No link in this category", "warning");
          }
          this.allLinks = r.sites;
          this.newLink = r.sites[0] ? r.sites[0].link : "This category is empty";
          this.selectedLink = r.sites[0] ? r.sites[0]._id : "This category is empty";
          this.method = r.sites[0] ? r.sites[0].method : "GET";
          this.newCat = this.category;
        })
        .catch((e) => {
            console.log(e);
            this.toast("An error was occured", "danger")
            });
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
      if ((this.method !== index.method || this.newLink !== index.link || this.category !== this.newCat && this.action === "PUT") || this.action === "DELETE") {
        fetch(`http://localhost:3000/api/links/${this.selectedLink}`, {
          method: this.action,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (r) => {
            if (r.status === 200) {
              this.toast(r.message, "success");
            } else if(r.status === 400) {
              this.toast(r.message, "warning");
            } else {
              this.toast("An error was occured", "danger");
            }
          })
          .catch((e) => {
            console.log(e);
            this.toast("An error was occured", "danger")
            });
      } else {
        this.toast("You try to change with all same parameter", "warning")
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
  margin-top: 0 !important;
  width: 60%;
}

#deleteLinkForm div select {
  font-size: 1.5rem;
  width: 8rem;
  margin: auto 1rem;
}

#deleteLinkForm div > label {
  font-size: 1.5rem;
}

#deleteLinkForm button {
  padding: 0 1rem;
}

#deleteLinkForm > select {
  width: 65%;
  margin-bottom: 2rem;
}

#deleteLinkForm > div
{
  margin: 1.5rem 0;
}

</style>

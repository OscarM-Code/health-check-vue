<template>
  <div id="allCard">
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
    <Card :allData="allData"></Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Items",
  components: {
    Card,
  },
  data() {
    return {
      name: "dataDiv",
      allData: [],
      loading: true,
    };
  },
  methods: {
    async loadData() {
      if (this.$route.params.item) {
        this.allData = [];
        const customRoute = this.$route.params.item
          ? this.$route.params.item
          : null;
        await fetch(`http://localhost:3000/api/categories/${customRoute}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((link) => {
            this.loading = false;
            link.sites.map((data) => {
              const { link, method, health, statusCode } = data;
              this.allData.push({ link: link, method: method, health: health, statusCode: statusCode });
            });
          });
      }
    },
    async checkData() {
      if (this.$route.params.item) {
        const customRoute = this.$route.params.item
          ? this.$route.params.item
          : null;
        await fetch(`http://localhost:3000/api/categories/${customRoute}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => response.json())
          .then((r) => {
            this.toast(r.message ? r.message : r.message, "success")
          }).catch((e) => {
            this.toast("An error was occured.", "danger")
            console.error(e);
          });
      }
    },
  },
  async mounted() {
    //await this.checkData();
    this.loadData()
    setInterval(() => {
      this.loading = true;
      setTimeout(async () => {
        //await this.checkData();
        this.loadData()}, 500);
    }, 120000);
  },
  watch: {
    $route(to, from) {
      if (to && to.href && to.href !== "/options") {
        this.loading = true;
        setTimeout(async () => {
          //await this.checkData();
          this.loadData();
        }, 1000);
      }
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
};
</script>

<style>

#allCard
{
  margin-top: 3rem;
  width: 100%;
}

#allCard > div
{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>

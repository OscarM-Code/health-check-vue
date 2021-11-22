<template>
<section id="items">
  <header>
    <div>
      <h1>Health Check</h1>
      <p>Check health of your link</p>
    </div>
  </header>
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
</section>
</template>

<script>
import Card from "../components/Card.vue";
import { createToast } from "mosha-vue-toastify";
import VueJwtDecode from "vue-jwt-decode";

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
      userData: VueJwtDecode.decode(localStorage.getItem("token")),
    };
  },
  methods: {
    async loadData() {
      if (this.$route.params.item) {
        this.allData = [];
        const customRoute = this.$route.params.item
          ? this.$route.params.item
          : null;
      await fetch(
        `https://warm-inlet-55236.herokuapp.com/api/user/${this.userData.userId}/categories/${customRoute}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((link) => {
          this.loading = false;
          link.sites.map((data) => {
            const { link, method, health, statusCode } = data;
            this.allData.push({
              link: link,
              method: method,
              health: health,
              statusCode: statusCode,
            });
          });
        });
      }
    },
  },
  computed: {
    storeCat() {
      return this.$store.state.allLinks;
    },
  },
  async mounted() {
    this.loadData();
    setInterval(() => {
      this.loading = true;
      setTimeout(async () => {
        this.loadData();
      }, 500);
    }, 120000);
  },
  watch: {
    $route(to, from) {
      if (to && to.href && to.href !== "/options") {
        this.loading = true;
        setTimeout(async () => {
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
#items header {
  height: 9rem;
  background: #000000;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-between;
  clip-path: ellipse(60% 100% at 50% 0);
  flex-direction: column;
}

#items header > div:nth-child(1) {
  margin: 1.5rem 3rem;
}

#items header > div:nth-child(1) > h1 {
  font-size: 3.5rem;
  font-weight: bold;
}

#allCard {
  margin-top: 3rem;
  width: 100%;
}

#allCard > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

<template>
<section id="items">
  <header>
    <h1>{{ storeCat.find((i) => i.id === this.$route.params.item).name.toUpperCase() }}</h1>
      <div>
        <h2>Health Check</h2>
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
#items {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
}

#items header
{
    height: 45vh;
    width: 100%;
    background: url("../assets/img/bgItems.jpg");
    background-position: center;
    background-size: cover;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

#items header > div > h2
{
  font-size: 2rem;
  font-weight: bold;
}

#items header > div
{
  margin: 1.5rem 3rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
}

#items header h1
{
  font-size: 5rem;
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

@media only screen and (max-width : 400px) and (orientation: portrait) {

  #items header h1
  {
    font-size: 3rem;
  }

  #items header > div
  {
    margin: 0.5rem 0.5em;
  }

}

@media only screen and (max-width : 900px) and (orientation: landscape) {

  #items header h1
  {
    font-size: 3rem;
  }

  #items header > div
  {
    margin: 0.5rem 0.5em;
  }

  #items header > div h2
  {
    font-size: 1.5rem;
  }

}

</style>

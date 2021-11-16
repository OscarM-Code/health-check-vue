<template>
  <header>
    <div>
      <h1>Health Check</h1>
      <p>Check health of your link</p>
    </div>
  </header>
    <div ref="nav" class="nav">
      <router-link to="/">Home</router-link>
      <div>
        <p>Categories:</p>
        <router-link v-for="link in links" :key="link" :to="'/items/' + link.id" @click="toggleMenu"> {{ link.name[0].toUpperCase() + link.name.slice(1) }} </router-link>
        </div>
      <router-link to="/options" @click="toggleMenu">Options</router-link>
    </div>
    <div ref="toogle" class="toggle" @click="toggleMenu"></div>
  <router-view/>
</template>

<script>
export default {
  data(){
    return {
      storeLinks: this.$store.state.allLinks
    }
  },
  computed: {
    links(){
      return this.$store.state.allLinks
    }
  },
  methods: {
    setBtn(){
      this.value = this.$route.params.item ? this.$route.params.item : null;
    },
    toggleMenu(){
      this.$refs.nav.classList.toggle('active');
      this.$refs.toogle.classList.toggle('active');
    }
  },
  async beforeCreate() {
    await fetch(`http://localhost:3000/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(async (link) => {
        await this.$store.commit('getAllLinks', link);
        this.setBtn();
      });
  },
  watch:{
    $route (to, from){
        if(to && to.href && to.href !== "/options"){
            this.setBtn();
        }
    }
  } 
}
</script>

<style>

*
{
  margin: 0;
  padding: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  width: 100%;
  background: #000428;
  background: -webkit-linear-gradient(to right, #004e92, #000428);
  background: linear-gradient(to right, #004e92, #000428);
  min-height: 100vh;
}

.nav a {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  transition: 0.3s;
  margin: 0.5rem 1rem;
}

.nav a:hover {
  transform: scale(1.1);
}

.nav a.router-link-exact-active {
  color: #004e92;
}

header
{
    height: 9rem;
    background: #000000;
    color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: space-between;
    clip-path: ellipse(60% 100% at 50% 0);
    flex-direction: column;
}

header > div:nth-child(1)
{
  margin: 1.5rem 3rem;
}

header > div:nth-child(1) > h1
{
  font-size: 3.5rem;
  font-weight: bold;
}

.toggle
{
    position: fixed;
    top: 25px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #000 url(./assets/img/menu.png);
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 1000;
    transition: 0.5s;
}

.toggle:hover
{
    transform: scale(1.2);
}

.toggle.active
{
    background: #000 url(./assets/img/close.png);
    background-size: 25px;
    background-position: center;
    background-repeat: no-repeat;
}

.nav > div
{
  display: flex;
  flex-direction: column;
  border: 2px solid #ffffff;
  padding: 1rem 0; 
  border-radius: 2rem;
  position: relative;
}

.nav > div > p
{
  font-size: 1.5rem;
  margin: 0.5rem 0;
  position: absolute;
  background: #000000;
  top: -1.5rem;
  left: 3.8rem;
  padding: 0 0.5rem;
}

.nav > *
{
  margin: 1.5rem 0;
}

.nav
{
    position: fixed;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    padding: 40px;
    z-index: 1000;
    right: -100%;
    top: 0;
    height: 100vh;
    flex-direction: column;
    min-width: 20rem;
}

.nav.active
{
    right: 0;
}

</style>
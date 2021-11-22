<template>
    <div ref="nav" class="nav" v-if="userData">
      <div>
        <p>Categories:</p>
        <router-link v-for="link in links" :key="link" :to="'/items/' + link.id" @click="toggleMenu"> {{ link.name[0].toUpperCase() + link.name.slice(1) }} </router-link>
        </div>
      <router-link to="/options" @click="toggleMenu">Options</router-link>
      <div id="logout" ref="logout">
        <div>
          <p>User:</p>
          <h2>{{ userData.first_name + " " + userData.last_name }}</h2>
        </div>
        <img src="./assets/img/logout.png" @click="toggleLogout">
        <div>
          <p>Logout ?</p>
          <div>
            <button @click="logoutReturn">Yes</button>
            <button @click="toggleLogout">No</button>
          </div>
        </div>
      </div>
    </div>
    <div ref="toogle" class="toggle" @click="toggleMenu" v-if="userData"></div>
  <router-view/>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data(){
    return {
      storeLinks: this.$store.state.allLinks,
      userData: localStorage.getItem("token") ? VueJwtDecode.decode(localStorage.getItem("token")) : null
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
    },
    toggleLogout(){
      this.$refs.logout.classList.toggle('active');
    },
    logout(){
      localStorage.removeItem("token");
      this.$router.push("/")
    },
    logoutReturn(){
      this.logout()
      this.toggleMenu()
      this.toggleLogout()
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  },
  async beforeCreate() {
    if(localStorage.getItem("token")){
      let userData = await VueJwtDecode.decode(localStorage.getItem("token"));
      let link;
      if(userData.role === "ROLE_ADMIN"){
        link = `http://warm-inlet-55236.herokuapp.com/api/categories`
      }
      else{
        link = `http://warm-inlet-55236.herokuapp.com/api/userCategories`
      }
      await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then((response) => response.json())
        .then(async (links) => {
          console.log(links);
          await this.$store.commit('getAllLinks', links);
          this.setBtn();
        });
    }
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

html {
    overflow-y: overlay;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

.nav > div:nth-child(1)
{
  display: flex;
  flex-direction: column;
  border: 2px solid #ffffff;
  padding: 1rem 0; 
  border-radius: 2rem;
  position: relative;
  align-items: center;
}

.nav > div:nth-child(1) > p
{
  font-size: 1.5rem;
  margin-top: -2rem;
  background: #000000;
  padding: 0 0.5rem;
}

.nav
{
    position: fixed;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    padding: 0 40px;
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

#logout
{
  width: 100%;
  border-top: 2px solid #ffffff;
  bottom: -10rem;
  position: absolute;
  height: 16rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  transition: 0.5s;
}

#logout.active
{
  bottom: 0;
}

#logout.active img
{
  transform: rotateZ(90deg);
  filter: invert(12%) sepia(82%) saturate(470%) hue-rotate(352deg) brightness(98%) contrast(90%);
}

#logout img
{
  margin-top: 2rem;
  filter: invert(12%) sepia(80%) saturate(6444%) hue-rotate(8deg) brightness(109%) contrast(124%);
  height: 2rem;
  transition: 0.3s;
}

#logout img:hover
{
  transform: scale(1.2);
  cursor: pointer;
}

#logout > div
{
  height: 6rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
}

#logout > *
{
  margin: 0 1.5rem;
}

#logout >div:nth-child(3)
{
  height: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

#logout > div:nth-child(3) p
{
  margin-top: 1rem;
  font-size: 2.5rem;
  color: red;
  font-weight: bold;
}

#logout >div:nth-child(3) button
{
  background: none;
  font-size: 1.5rem;
  border: 2px solid #ffffff;
  color: #ffffff;
  width: 4rem;
  margin: 0 1rem;
  transition: 0.3s;
}

#logout >div:nth-child(3) button:hover
{
  transform: scale(1.2);
  color: #31d331;
  border-color: #31d331;
  cursor: pointer;
}


#logout >div:nth-child(3) div
{
  margin-top: 1rem;
}

</style>
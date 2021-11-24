<template>
    <div ref="nav" class="nav" v-if="userData">
      <router-link to="/options" @click="toggleMenu">Options</router-link>
      <div>
        <p>Categories:</p>
        <router-link v-for="link in links" :key="link" :to="'/items/' + link.id" @click="toggleMenu"> {{ link.name[0].toUpperCase() + link.name.slice(1) }} </router-link>
        </div>
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
        link = `https://warm-inlet-55236.herokuapp.com/api/categories`
      }
      else{
        link = `https://warm-inlet-55236.herokuapp.com/api/userCategories`
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
          if (links.status && (r.status === 401 || links.status === 403)) {
            this.logout();
          }
          await this.$store.commit('getAllLinks', links);
          this.setBtn();
        })
        .catch((error) => {
          console.log(error);
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
}

.nav a:nth-child(1)
{
  margin: 10rem 0 1rem 0;
  border-bottom: 4px solid #ffffff;
  padding-bottom: 1rem;
  width: 100%;
  text-align: end;
}

.nav a:hover {
  transform: scale(1.1);
}

.nav a.router-link-exact-active {
    color: transparent;
    background: #833ab4;
    background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
    background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
    background-clip: text;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
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

.nav > div:nth-child(2)
{
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  position: relative;
  align-items: flex-end;
  width: 100%;
}

.nav > div:nth-child(2) > p
{
  font-size: 1.5rem;
}

.nav > div:nth-child(2) > *
{
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ffffff;
  width: 100%;
  text-align: end;
}

.nav > div:nth-child(2) > a:last-child
{
  border-bottom-width: 4px;
}

.nav
{
    position: fixed;
    background: #000;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
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
  left: 0;
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

@media only screen and (max-width : 400px) and (orientation: portrait) {

  .nav
  {
    width: 100vw;
    padding: 0;
  }

  .nav a:nth-child(1)
  {
    margin-top: 5rem;
  }

  .nav a, .nav div:nth-child(2) p
  {
    margin-right: 5% !important;
    width: 90% !important;
  }

  .nav > div:nth-child(2)
  {
    overflow: scroll;
    margin-bottom: 6rem;
  }

  #logout
  {
    background: #000;
    z-index: 9999;
  }

  .toggle
  {
    top: 0.5rem;
    right: 0.5rem;
  }
}

@media only screen and (max-width : 300px){

    .nav
  {
    width: 100vw;
    padding: 0;
  }

  .nav a:nth-child(1)
  {
    margin-top: 5rem;
  }

  .nav a, .nav div:nth-child(2) p
  {
    margin-right: 5% !important;
    width: 90% !important;
  }

  .nav > div:nth-child(2)
  {
    overflow: scroll;
    margin-bottom: 6rem;
  }

  #logout
  {
    background: #000;
    z-index: 9999;
  }

}

@media only screen and (max-width : 900px) and (orientation: landscape) {

  .nav
  {
    width: 100%;
    height: 100vh;
    right: -100%;
    padding: 0;
  }

  .nav a:nth-child(1)
  {
    margin-top: 5rem;
  }

  .nav a, .nav div:nth-child(2) p
  {
    margin-right: 5% !important;
    width: 90% !important;
  }

  .nav > div:nth-child(2)
  {
    overflow: scroll;
    margin-bottom: 6rem;
  }

  #logout
  {
    background: #000;
    z-index: 9999;
    bottom: -10rem;
    width: 100vw;
  }

}


</style>
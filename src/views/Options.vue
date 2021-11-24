<template>
<section id="options"> 
  <header>
    <h1>Options</h1>
    <div>
      <h2>Health Check</h2>
      <p>Check health of your link</p>
    </div>
  </header>
  <div id="formDiv">
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
    <Form1></Form1>
    <Form2 :categories="storeCat" v-if="storeCat.length !== 0"></Form2>
    <Form3 :categories="storeCat" v-if="storeCat.length !== 0"></Form3>
    <Form4 :categories="storeCat" v-if="storeCat.length !== 0"></Form4>
  </div>
</section>
</template>

<script>
import Form1 from "../components/FormCat.vue";
import Form2 from "../components/FormLink.vue";
import Form3 from "../components/FormDeleteCat.vue";
import Form4 from "../components/FormDeleteLink.vue";

export default {
  name: "Options",
  components: {
    Form1,
    Form2,
    Form3,
    Form4,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    storeCat() {
      return this.$store.state.allLinks;
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style>

#options {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
}

#options header
{
    height: 50vh;
    width: 100%;
    background: url("../assets/img/bgOptions.jpg");
    background-position: center;
    background-size: cover;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

#options header > div > h2
{
  font-size: 2rem;
  font-weight: bold;
}

#options header > div
{
  margin: 1.5rem 3rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
}

#options header h1
{
  font-size: 5rem;
}

#formDiv {
  width: 80rem;
  margin: 6.5rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: 3px #000000 solid;
  border-radius: 0.5rem;
}

#formDiv form {
  width: 100%;
  border-bottom: 3px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  max-height: 4rem;
  position: relative;
  transition: 0.5s !important;
}

#formDiv form > div:nth-child(1)
{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

#formDiv form:last-child
{
  border-bottom: none;
}

#formDiv form.active
{
  max-height: 100rem;
  transition: 0.5s !important;
}

#formDiv form > div img
{
  height: 3rem;
  transition: 0.5s;
}


#formDiv form > div:hover img
{
  cursor: pointer;
  transform: scale(1.1);
}

#formDiv form > div:nth-child(1):hover
{
  background: #ffe2bb;
  cursor: pointer;
}

#formDiv form > div:nth-child(1)
{
  width: 100%;
  height: 4rem;
  display: flex;
}

#formDiv form div img.active
{
  transform: rotateZ(-180deg);
}

#formDiv form input {
  background: none;
  border: none;
  border-bottom: 1px solid #000000;
  color: #000000;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 2rem;
}

#formDiv form input:focus,
#formDiv form select:focus
{
  outline: none;
}

#formDiv form button {
  background: #000000;
  border: none;
  border-radius: 2rem;
  color: #ffffff;
  text-align: center;
  transition: 0.4s;
  font-size: 2rem;
  margin-bottom: 2rem;
}

#formDiv form button:hover {
  transform: scale(1.2);
  cursor: pointer;
}

#formDiv form label {
  color: #000000;
  font-size: 1.5rem !important;
  text-align: start;
}

#formDiv form h2 {
  color: #000000;
  font-size: 2rem;
  margin: 1rem 0 2rem 2rem;
  font-weight: 400;
  align-self: flex-start;
}

#formDiv form select {
  background: none;
  border: none;
  border-bottom: 1px solid #000000;
  color: #000000;
  text-align: start;
  padding: 0.5rem 0;
  font-size: 2rem;
  cursor: pointer;
}

#formDiv form select option {
  background: none;
  color: #000000;
}

.loader
{
  margin: 0;
  width: 100vw;
  height: 100vh;
}

@media only screen and (max-width : 400px) and (orientation: portrait) {

  #options
  {
    width: 100vw;
  }

  #formDiv
  {
    width: 95%;
  }

  #options header > div
  {
    margin: 0.5rem 0.5rem;
  }

  #options header
  {
    height: 40vh;
  }

  #formDiv form h2
  {
    font-size: 1.1rem;
    margin: auto 0.5rem;
  }

  #formDiv form div:nth-child(1)
  {
    align-items: center;
  }

  #formDiv form label,
  #formDiv form input,
  #formDiv form select,
  #formDiv form button
  {
    font-size: 1rem !important;
  }

  #formDiv form > div:nth-child(2) > *,
  #formDiv form > section:nth-child(2) > *
  {
    margin: 0.5rem;
  }

  #formDiv form button
  {
    height: 2rem;
    width: 5rem;
  }

  #formDiv form > div:nth-child(2) > div:nth-child(1n+1),
  #formDiv form > section:nth-child(2) > div:nth-child(1n+1)
  {
    align-items: flex-start;
    width: 60%;
  }

  #formDiv form input
  {
    width: 100%;
  }

}

@media only screen and (max-width : 900px) and (orientation: landscape) {

  #options
  {
    width: 100vw;
  }

  #options h1
  {
    font-size: 3rem !important;
  }

  #formDiv
  {
    width: 95%;
  }

  #options header > div
  {
    margin: 0.5rem 0.5rem;
  }

  #options header
  {
    height: 40vh;
  }

  #formDiv form h2
  {
    font-size: 1.1rem;
    margin: auto 0.5rem;
  }

  #formDiv form div:nth-child(1)
  {
    align-items: center;
  }

  #formDiv form label,
  #formDiv form input,
  #formDiv form select,
  #formDiv form button
  {
    font-size: 1rem !important;
  }

  #formDiv form > div:nth-child(2) > *,
  #formDiv form > section:nth-child(2) > *
  {
    margin: 0.5rem;
  }

  #formDiv form button
  {
    height: 2rem;
    width: 5rem;
  }

  #formDiv form > div:nth-child(2) > div:nth-child(1n+1),
  #formDiv form > section:nth-child(2) > div:nth-child(1n+1)
  {
    align-items: flex-start;
    width: 60%;
  }

  #formDiv form input
  {
    width: 100%;
  }

}

@media (min-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {

  #formDiv
  {
    width: 95%;
  }

  #formDiv form > div:nth-child(2) > div:nth-child(1n+1),
  #formDiv form > section:nth-child(2) > div:nth-child(1n+1)
  {
    align-items: flex-start;
    width: 60%;
  }

}

@media (max-device-width: 1024px) and (orientation: landscape) {

  #formDiv
  {
    width: 95%;
  }

}

</style>

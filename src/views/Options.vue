<template>
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
    <Form1 :categories="storeCat" v-if="storeCat.length !== 0"></Form1>
    <Form2 v-if="storeCat.length !== 0"></Form2>
    <Form3 :categories="storeCat" v-if="storeCat.length !== 0"></Form3>
    <Form4 :categories="storeCat" v-if="storeCat.length !== 0"></Form4>
  </div>
</template>

<script>
import Form1 from "../components/FormLink.vue";
import Form2 from "../components/FormCat.vue";
import Form3 from "../components/FormDeleteLink.vue";
import Form4 from "../components/FormDeleteCat.vue";

export default {
  name: 'Options',
  components: {
    Form1,
    Form2,
    Form3,
    Form4
  },
  data() {
    return {
      loading: true
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
}
</script>

<style>

#formDiv {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}

form
{
    width: 80rem;
    margin: 2rem 0;
    border: 5px solid #ffffff;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

form input
{
  background: none;
  border: 1px solid #ffffff;
  border-radius: 2rem;
  color: #ffffff;
  text-align: center;
  padding: 0.5rem 0;
  font-size: 2rem;
  margin: 2rem 0;
}

button
{
  background: #ffffff;
  border: none;
  border-radius: 2rem;
  color: #000;
  text-align: center;
  transition: 0.7s;
  font-size: 2rem;
  margin-bottom: 2rem;
}

button:hover
{
  background: #000;
  color: #ffffff;
  transform: scale(1.2);
  cursor: pointer;
}

form > label
{
  font-size: 1.5rem !important;
  margin-top: 0 !important;
}

form h2
{
  font-size: 3rem;
  margin-top: 1rem;
}

form select
{
  background: none;
  border: 1px solid #ffffff;
  border-radius: 2rem;
  color: #ffffff;
  text-align: center;
  padding: 0.5rem 0;
  font-size: 2rem;
  cursor: pointer;
}

form select option
{
  background: none;
  color: #000000;
}

</style>
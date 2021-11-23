<template>
  <div id="allCard">
    <loader
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
  </div>
</template>
<script>
export default {
    name: 'Item',
    computed: {
        allData() {
            return this.$store.state.allLinks;
        }
    },
    mounted() {
        if (!this.allData || this.allData.length === 0) {
            this.$router.push('/options');
        } else {
            this.$router.push(`/items/${this.allData}`);
        }
    }
}
</script>
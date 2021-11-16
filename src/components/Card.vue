<template>
<div>
    <div class="dataDiv" v-for="data in this.allData" :key="data">
      <div class="circle">
      <div>
        <p :class="data.health ? 'on' : 'off'">{{ data.health ? "Ok" : "Off" }}</p>
      </div>
      <p>{{ data.method }}</p>
      <div>
        <p>Status Code:</p>
        <h3>{{ data.statusCode ? data.statusCode : "Not Found" }}</h3>
      </div>
      </div>
        <h2>{{ data.link }}</h2>
    </div>
</div>
</template>

<script>
export default {
    props: ['allData']
}
</script>

<style>
.dataDiv
{
  width: 22rem;
  height: 27rem;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  transition: 0.5s;
}

.dataDiv .circle
{
  width: 100%;
  height: 60%;
  background: rgb(0, 0, 0);
  clip-path: circle(14rem at center 1rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.dataDiv > h2
{
  color: #000000;
  font-size: 1.5rem;
  overflow-wrap: break-word;
  margin: auto auto;
  width: 80%;
}

.dataDiv .circle > div:nth-child(1) p
{
  margin-top: 1rem;
  height:7rem;
  width: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 50rem;
}

.dataDiv .circle > div:nth-child(1)
{
  margin-top: 0.5rem;
}

.dataDiv .circle > p
{
  margin-top: 0.5rem;
  border: 1px solid #ffffff;
  padding: 0 0.2rem;
}

.dataDiv .circle > div:nth-child(3)
{
  margin-top: 1rem;
  height: 15%;
  font-size: 1.3rem;
}

.off
{
    background: rgb(255, 0, 51);
}
.on
{
    background: #77c207;
}
</style>
<template>
    <div id="home">
        <h1>Health-Check</h1>
        <p>Check health of your request for a link.</p>
        <div id="btn-div">
            <a href="/login" class="btn">Login</a>
            or
            <a href="/register" class="btn">Register</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home'
}
</script>
<style>

#home
{
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    background: url("../assets/img/bgHome.jpg");
    background-size: cover;
    background-position: 0 -19rem;
    background-repeat: no-repeat;
}

#home > div > button a
{
    color: #fff;
    text-decoration: none;

}

#home > div > .btn
{
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
    text-decoration: none;
    border: 2px solid #fff;
    width: 9vw;
    background: none;
    padding: 0.7rem 0; 
    transition: 0.3s;
}

#home > div > .btn:hover
{
    transform: scale(1.15);
    color: transparent;
    background: #833ab4;
    background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
    background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
    background-clip: text;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-size: 70% 70%;
    border: 2px solid;
    border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
}

#home div
{
    margin-top: 7rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

#home div > *
{
    margin: 0 2rem;
}

#home h1
{
    margin-top: 12rem;
    margin-bottom: 1rem;
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 10px #000;
}

</style>
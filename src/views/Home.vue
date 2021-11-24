<template>
    <div id="home">
        <h1>Health-Check</h1>
        <p>Check health of your request for a link.</p>
        <div id="btn-div">
            <a href="/login" class="btn">Se connecter</a>
            ou
            <a href="/register" class="btn">S'enregistrer</a>
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
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000000;
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
    width: 10rem;
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

@media only screen and (max-width : 400px) and (orientation: portrait) {
    #home h1
    {
        margin-top: 4rem;
        font-size: 3rem;
    }

    #home > div
    {
        margin-top: 1rem;
        flex-direction: column;
    }

    #home div > *
    {
        margin: 1rem 0.5rem;
    }

    #home > div .btn
    {
        color: transparent;
        background: #833ab4;
        background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background-clip: text;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        border: 2px solid;
        border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
        border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    }

}

@media only screen and (max-width : 300px){
    #home h1
    {
        font-size: 2.5rem;
    }
}

@media only screen and (max-width : 900px) and (orientation: landscape) {
    #home h1
    {
        margin-top: 2rem;
        font-size: 3rem;
    }

    #home > div
    {
        margin-top: 1rem;
    }

    #home > div .btn
    {
        color: transparent;
        background: #833ab4;
        background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background-clip: text;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        border: 2px solid;
        border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
        border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

    #home > div .btn
    {
        color: transparent;
        background: #833ab4;
        background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background-clip: text;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        border: 2px solid;
        border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
        border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    }

    #home h1
    {
        margin-top: 15rem;
        font-size: 6rem;
    }

    #home p
    {
        font-size: 1.5rem;
    }
}

@media (max-device-width: 1024px) and (orientation: landscape) {

    #home > div .btn
    {
        color: transparent;
        background: #833ab4;
        background: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background: linear-gradient(to right, #fddd27, #1dbefd, #b852fc);
        background-clip: text;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        border: 2px solid;
        border-image: linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
        border-image: -webkit-linear-gradient(to right, #fddd27, #1dbefd, #b852fc) 1;
    }

    #home h1
    {
        margin-top: 8rem;
    }

    #home > div
    {
        margin-top: 5rem;
    }
}

</style>
<template>
    <div id="login">
        <div id="form">
            <h1>Information de connection</h1>
            <form @submit.prevent="login">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Entrer votre Email ici." v-model="mail">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" placeholder="Mot de passe" v-model="password">
                <button>Login</button>
            </form>
            <p>Ou créer un compte: <a href="/register">S'enregistrer</a></p>
        </div>
    </div>
</template>
<script>
import { createToast } from "mosha-vue-toastify";
import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'login',
    data() {
        return {
            mail: new URLSearchParams(window.location.search).get("email") || null,
            password: null,
        }
    },
    methods: {
        login() {
            if (this.mail && this.password) {
                fetch('https://warm-inlet-55236.herokuapp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        email: this.mail,
                        password: this.password
                    })
                })
                .then(response => response.json())
                .then(r => {
                    console.log(r);
                    if (r.status === 200) {
                        this.toast("Login successfully", 'success');
                        localStorage.setItem("token", r.thisUser.token);
                        this.$router.push(`/items`);
                        setTimeout(() => {
                        window.location.reload();
                        }, 300)
                    } else {
                        this.toast(r.message, 'danger');
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.toast("Something went wrong", 'danger');
                });
            }else {
                this.toast("Please fill all the fields.", "danger");
            }
        }
    },
    setup() {
    const toast = (message, type) => {
      createToast(message, {
        position: "top-left",
        timeout: 5000,
        type: type,
        showIcon: true,
      });
    };
    return { toast };
  },
}
</script>
<style>
#login {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/img/bgLogin.jpg");
    background-size: cover;
    background-position: right;
    display: flex;
    justify-content: end;
}

#login #form
{
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
}

#login #form > form
{
    margin-top: 5rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

#login #form h1
{
    margin-top: 8rem;
    font-size: 2.5rem;
    color: #000000;
    text-shadow: none;
    text-align: center;
}

#login #form > form > label
{
    font-size: 1.5em;
    font-weight: bold;
    color: #000000;
    text-shadow: none;
    margin-top: 1rem;
}

#login #form > form > input
{
    width: 100%;
    height: 3rem;
    border: none;
    border-bottom: 2px solid #000000;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

#login #form > form > input:focus
{
    outline: none;
}

#login #form > form > button
{
    width: 100%;
    height: 4rem;
    border: none;
    border-radius: 5px;
    background: #000000;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

#login #form > form > button:hover
{
    transform: scale(1.1);
}

#form > p
{
    font-size: 1.2rem;
    color: #000000;
    text-shadow: none;
    margin-top: 1rem;
}

@media only screen and (max-width : 420px) and (orientation: portrait) {

    #login #form
    {
        width: 100%;
    }

    #login #form > form
    {
        margin-top: 1rem;
    }

    #login #form h1
    {
        margin-top: 4rem;
    }

}

@media only screen and (max-width : 900px) and (orientation: landscape) {

    #login #form
    {
        width: 70%;
    }

    #login #form > form
    {
        margin-top: 1rem;
    }

    #login #form h1
    {
        margin-top: 4rem;
    }

    #login {
    background-size: 100% auto;
    height: auto;
    width: 100%;
    }

}

@media (min-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    #login #form
    {
        width: 70%;
    }

    #login {
    background-size: cover;
    background-position: left 45% bottom;
    }
}

@media (width: 1024px) and (orientation: landscape) {
    #login #form
    {
        width: 50%;
    }

    #login #form > form
    {
        margin-top: 1rem;
    }

    #login #form h1
    {
        margin-top: 4rem;
    }

}

</style>
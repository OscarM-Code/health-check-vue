<template>
    <div id="register">
        <div id="form">
            <h1>Register Information</h1>
            <form @submit.prevent="register">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Enter your first name here." v-model="firstName">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Enter your last name here." v-model="lastName">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Enter your mail address here." v-model="mail">
                <label for="password">Password</label>
                <input type="password" id="password" minlength="8" maxlength="15" placeholder="Password (8-15 characters)" v-model="password">
                <button>Register</button>
            </form>
        </div>
    </div>
</template>
<script>
import { createToast } from "mosha-vue-toastify";

export default {
    name: 'Register',
    data() {
        return {
            firstName: null,
            lastName: null,
            mail: null,
            password: null,
        }
    },
    methods: {
        register() {
            if (this.firstName && this.lastName && this.mail && this.password) {
                fetch('http://warm-inlet-55236.herokuapp.com/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: this.firstName,
                        last_name: this.lastName,
                        email: this.mail,
                        password: this.password
                    })
                })
                .then(response => response.json())
                .then(r => {
                    console.log(r);
                    if (r.statusCode === 200) {
                        this.toast("Registered successfully", 'success');
                        this.$router.push(`/login?email=${this.mail}`);
                    } else {
                        this.toast(r.res.message, 'danger');
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
#register {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/img/bgRegister.jpg");
    background-size: cover;
    background-position: right;
}

#register #form
{
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
}

#register #form > form
{
    margin-top: 5rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

#register #form h1
{
    margin-top: 8rem;
    font-size: 2.5rem;
    color: #000000;
    text-shadow: none;
    text-align: center;
}

#register #form > form > label
{
    font-size: 1.5em;
    font-weight: bold;
    color: #000000;
    text-shadow: none;
    margin-top: 1rem;
}

#register #form > form > input
{
    width: 100%;
    height: 3rem;
    border: none;
    border-bottom: 2px solid #000000;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

#register #form > form > input:focus
{
    outline: none;
}

#register #form > form > button
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

#register #form > form > button:hover
{
    transform: scale(1.1);
}

@media only screen and (max-width : 420px) and (orientation: portrait) {

    #register #form
    {
        width: 100%;
    }

    #register #form > form
    {
        margin-top: 1rem;
    }

    #register #form h1
    {
        margin-top: 4rem;
    }

}

@media only screen and (max-width : 900px) and (orientation: landscape) {

    #register #form
    {
        width: 70%;
    }

    #register #form > form
    {
        margin-top: 1rem;
    }

    #register #form h1
    {
        margin-top: 4rem;
    }

    #register {
    background-size: 100% auto;
    height: auto;
    width: 100%;
    }

}

@media (min-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    #register #form
    {
        width: 70%;
    }

    #register {
    background-size: cover;
    background-position: left 45% bottom;
    }
}

@media (width: 1024px) and (orientation: landscape) {
    #register #form
    {
        width: 50%;
    }

    #register #form > form
    {
        margin-top: 1rem;
    }

    #register #form h1
    {
        margin-top: 4rem;
    }

}

</style>
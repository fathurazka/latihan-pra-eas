<template>
<div class="page-container">
  <div class="loginSign">
    <div class="signContainer">
      <h1>Welcome!</h1>
    </div>
  </div>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" id="loginForm" class="form-container">
      <div class="email-container">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" name="email" />
      </div>
      <div class="password-container">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" name="password" />
      </div>
      <div class="login-button-container">
        <button type="submit">Login</button>
      </div>
    </form>

    <div class="toRegister">
    <button @click="showRegisterForm">Register</button>
  </div>
  </div>


</div>

<div class="register-container" v-if="showRegisterFormContainer">
  <div class="close-button">
    <button @click="hideRegisterForm">X</button>
  </div>
  <div class="register-headline">
    <h1>Account Registration</h1>
  </div>
  <div class="register-form-container">
    <form @submit.prevent="handleRegister" id="registerForm" class="register-form-container">
      <div class="username-container">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="usernameRegister" name="username" />
      </div>

      <div class="email-container">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="emailRegister" name="email" />
      </div>
      
      <div class="password-container">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="passwordRegister" name="password" />
      </div>

      <div class="register-button-container">
        <button type="submit">Register</button>
      </div>

    </form>
  </div>
</div>
</template>

<script>
import { useRouter } from "vue-router";
import { provide, reactive, ref, toRefs } from "vue";
import { store } from '../store'

export default {
        setup() {
            const router = useRouter();
            
            const state = reactive({
                email: '',
                password: '',
                usernameRegister: '',
                emailRegister: '',
                passwordRegister: '',
            });

            const handleSubmit = async () => {
                try{
                    const response = await fetch('http://localhost:3000/api/accounts/login', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: state.email,
                            password: state.password,
                        }),
                    });

                    const data = await response.json();

                    if(data.message === 'Auth Passed') {
                        store.username = data.user.username;
                        store.userID = data.user.id;
                        router.push('/homepage');
                    } else {
                        router.push('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            const showRegisterFormContainer = ref(false);

            const showRegisterForm = () => {
                showRegisterFormContainer.value = true;
            };

            const hideRegisterForm = () => {
                showRegisterFormContainer.value = false;
            };

            const handleRegister = async () => {
              try {
                const response = await fetch('http://localhost:3000/api/accounts/' , {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: state.usernameRegister,
                    email: state.emailRegister,
                    password: state.passwordRegister,
                  }),
                });
                console.log(state.usernameRegister);
                console.log(state.emailRegister);
                console.log(state.passwordRegister);
                const data = await response.json();
                if(data.message === 'Account successfully created.') {
                  alert('Account successfully created. You can login using the created account.');
                  showRegisterFormContainer.value = false;
                } else {
                  alert('Account creation failed. Please try again.');
                  state.usernameRegister = '';
                  state.emailRegister = '';
                  state.passwordRegister = '';
                }

                router.push('/');
              } catch (error) {
                console.log(error);
              }
            } 

            return { ...toRefs(state), handleSubmit, showRegisterFormContainer, showRegisterForm, hideRegisterForm, handleRegister};
        },
    };
</script>


<style scoped>

* button {
  cursor: pointer;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: rgb(20, 96, 20)
}

.loginSign {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  padding: 20px;
}

.signContainer {
  border: 1px solid black;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}

.login-container {
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 400px;
  border: 1px solid black;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  background-color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
}
.username-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
}
.email-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
}

.password-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
}

.login-button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
}

#loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 200px;
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 100px;
}

#loginForm label {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: black;
}

#loginForm input {
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid black;
  border-radius: 6px;
  height: 40px;
}

#loginForm button {
  margin-top: 40px;
  border: 1px solid black;
  border-radius: 6px;
  height: 40px;
}

.toRegister {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 70px;
}

.register-container {
  margin: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 60vw;
  height: 80vh;
  z-index: 99;
  background-color: thistle;
}

.close-button {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: rgb(214, 214, 214);
  border: 1px solid rgba(0, 0, 0, 0.75);
}

.close-button button {
  height: 100%;
  width: 40px;
  border-radius: 0px;
}

.register-headline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background-color: rgb(240, 240, 240);
}

.register-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 240, 240);
}

.register-form-container label {
  display: block;
}

.register-form-container input {
  display: block;
  width: 60%;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.75);
}
</style>
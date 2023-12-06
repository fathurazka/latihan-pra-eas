<template>
    <div class="loginSign">
      <div class="signContainer">
        <h1>Welcome!</h1>
      </div>
    </div>
    <div class="login">
      <form @submit.prevent="handleSubmit" id="loginForm">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" name="email" />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useRouter } from "vue-router";
  import { provide, reactive, toRefs } from "vue";
  import { store } from '../store'
  
  export default {
          setup() {
              const router = useRouter();
              
              const state = reactive({
                  email: '',
                  password: '',
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
                          router.push('/login');
                      }
                  } catch (error) {
                      console.log(error);
                  }
              };
  
              return { ...toRefs(state), handleSubmit};
          },
      };
  </script>
  
  
  <style scoped>
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
  
  .login {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 400px;
    margin-left: 210px;
    margin-right: 240px;
    border: 1px solid black;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    border-radius: 20px;
    background-color: white;
  }
  
  #loginForm {
    display: flex;
    flex-direction: column;
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
  }
  
  #loginForm button {
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 6px;
  }
  </style>
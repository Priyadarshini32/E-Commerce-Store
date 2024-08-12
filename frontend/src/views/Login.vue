<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Welcome Back</h2>
      <p>Please enter your credentials to log in.</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-wrapper">
            <i class="fas fa-user"></i>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <button type="submit">
          <v-btn>
            <v-icon left>mdi-login</v-icon>
            Login
          </v-btn>
        </button>
      </form>
      <p class="register-link">
        Not registered? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/navstore";
import axios from "axios";

const url = import.meta.env.VITE_APP_URL;
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200) {
      const token = response.data;

      authStore.login(token, username.value);

      // Navigate to the home page
      router.push("/home");
    } else {
      errorMessage.value = "Invalid username or password.";
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      errorMessage.value =
        error.response.data.message || "An error occurred while logging in.";
    } else {
      errorMessage.value = "An unknown error occurred.";
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 1100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: bolder;
  margin-left: 7%;
  margin-top: 5%;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.login-form h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #35495e;
}

.login-form p {
  margin-bottom: 30px;
  color: #888;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.form-group label {
  flex-basis: 30%; /* Label width */
  text-align: right; /* Right-align the label text */
  margin-right: 10px;
  font-weight: bold;
  color: #555;
  display: flex;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.input-wrapper i {
  position: absolute;
  left: 10px;
  color: #ccc;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background-color: #f9f9f9; /* Slightly off-white for input fields */
}

.input-wrapper input:focus {
  outline: none;
  border-color: #42b983;
  background-color: #fff;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.login-form button {
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #35495e;
}

.register-link {
  margin-top: 20px;
  color: #35495e;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-form {
    padding: 30px;
  }

  .login-form h2 {
    font-size: 22px;
  }

  .login-form p {
    margin-bottom: 20px;
  }

  .input-wrapper input {
    padding: 10px 10px 10px 35px;
  }
}
</style>

<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <p>Please fill in the details to create an account.</p>
      <form @submit.prevent="handleRegister">
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
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
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
        <button type="submit">Submit</button>
      </form>
      <p class="login-link">
        Already registered? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const url = import.meta.env.VITE_APP_URL;
const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const handleRegister = async () => {
  try {
    const response = await axios.post(`${url}/users/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    console.log(response.data);

    if (response.data) {
      alert("Registration successful!");
      router.push({ name: "Login" });
    } else {
      alert("Registration failed: " + response.data.message);
    }
  } catch (error) {
    console.log(error.response.data.errors[0].message);
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.errors[0].message);
    } else {
      alert("Registration failed: An unknown error occurred");
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 1100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: bold;
  margin-left: 7%;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.register-form h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #35495e;
}

.register-form p {
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
  flex-basis: 30%;
  text-align: right;
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
  background-color: #f9f9f9;
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

.register-form button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.register-form button:hover {
  background-color: #35495e;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-form {
    padding: 30px;
  }

  .register-form h2 {
    font-size: 22px;
  }

  .register-form p {
    margin-bottom: 20px;
  }

  .input-wrapper input {
    padding: 10px 10px 10px 35px;
  }
}
</style>

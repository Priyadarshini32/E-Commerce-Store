<template>
  <v-app-bar app>
    <v-toolbar-title>E-Commerce Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" @click="goToWelcome" color="black">Welcome</v-btn>

    <v-btn v-if="!isLoggedIn" @click="login" color="blue">Login</v-btn>
    <v-btn v-if="!isLoggedIn" @click="register" color="blue">Register</v-btn>
    <v-btn @click="goToHome" color="black">Home</v-btn>
    <v-btn v-if="isLoggedIn || isAdmin" @click="goToCart" color="green"
      >Cart</v-btn
    >
    <v-btn v-if="isLoggedIn || isAdmin" @click="goToOrders" color="grey"
      >View All Orders</v-btn
    >
    <v-btn v-if="isLoggedIn || isAdmin" @click="goToCheckout" color="purple"
      >Checkout</v-btn
    >
    <v-btn v-if="isLoggedIn || isAdmin" @click="logout" color="red"
      >Logout</v-btn
    >
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const isAdmin = ref(false);

onMounted(() => {
  const authToken = sessionStorage.getItem("authToken");
  isLoggedIn.value = !!authToken;
  isAdmin.value = sessionStorage.getItem("isAdmin") === "true";
});

const goToHome = () => {
  router.push("/home");
};

const goToWelcome = () => {
  router.push("/");
};

const goToCart = () => {
  router.push("/cart");
};

const goToOrders = () => {
  router.push("/orders");
};

const goToCheckout = () => {
  router.push("/checkout");
};

const login = () => {
  router.push("/login");
};

const register = () => {
  router.push("/register");
};

const logout = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("isAdmin");
  sessionStorage.removeItem("loggedInUser");
  isLoggedIn.value = false;
  isAdmin.value = false;
  router.push("/login");
};
</script>

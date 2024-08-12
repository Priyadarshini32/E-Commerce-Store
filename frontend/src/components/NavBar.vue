<template>
  <v-app-bar app>
    <v-toolbar-title>E-Commerce Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Buttons shown when not logged in -->
    <v-btn v-if="!authStore.isLoggedIn" @click="goToWelcome" color="black"
      >Welcome</v-btn
    >
    <v-btn v-if="!authStore.isLoggedIn" @click="login" color="blue"
      >Login</v-btn
    >
    <v-btn v-if="!authStore.isLoggedIn" @click="register" color="blue"
      >Register</v-btn
    >
    <v-btn v-if="!authStore.isLoggedIn" @click="goToHome" color="black"
      >Home</v-btn
    >

    <!-- Buttons shown when logged in as a user or admin -->
    <v-btn v-if="authStore.isLoggedIn" @click="goToHome" color="black"
      >Home</v-btn
    >
    <v-btn
      v-if="authStore.isLoggedIn || authStore.isAdmin"
      @click="goToCart"
      color="green"
      >Cart</v-btn
    >
    <v-btn
      v-if="authStore.isLoggedIn || authStore.isAdmin"
      @click="goToOrders"
      color="grey"
      >View All Orders</v-btn
    >
    <v-btn
      v-if="authStore.isLoggedIn || authStore.isAdmin"
      @click="goToCheckout"
      color="purple"
      >Checkout</v-btn
    >
    <v-btn
      v-if="authStore.isLoggedIn || authStore.isAdmin"
      @click="goToProfile"
      color="purple"
      >Profile</v-btn
    >

    <v-btn v-if="authStore.isLoggedIn" @click="logout" color="red"
      >Logout</v-btn
    >
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/navstore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

authStore.checkAuthStatus();

const goToHome = () => router.push("/home");
const goToWelcome = () => router.push("/");
const goToCart = () => router.push("/cart");
const goToOrders = () => router.push("/orders");
const goToCheckout = () => router.push("/checkout");
const login = () => router.push("/login");
const register = () => router.push("/register");
const goToProfile = () => router.push("/profile");

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

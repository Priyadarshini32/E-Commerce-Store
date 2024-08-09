<template>
  <div class="logout">
    <h2>Logging out...</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    router.push({ name: "Welcome" });
    return;
  }

  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("isAdmin");

  router.push({ name: "Welcome" });
});
</script>

<style scoped>
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

h2 {
  font-size: 24px;
  color: #333;
}
</style>

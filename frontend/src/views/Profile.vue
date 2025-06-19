<template>
  <div class="container">
    <div class="profile-container">
      <div class="profile-card" v-if="user">
        <h2>User Profile</h2>
        <div class="profile-details">
          <div class="detail-item">
            <strong>ID</strong> <span>{{ user.id }}</span>
          </div>
          <div class="detail-item">
            <strong>Username</strong> <span>{{ user.username }}</span>
          </div>
          <div class="detail-item">
            <strong>Email</strong> <span>{{ user.email }}</span>
          </div>
        </div>
        <br />
        <div class="address-section" v-if="address">
          <h3>Default Address</h3>
          <br />
          <div class="detail-item">
            <strong>Street</strong> <span>{{ address.street }}</span>
          </div>
          <div class="detail-item">
            <strong>City</strong> <span>{{ address.city }}</span>
          </div>
          <div class="detail-item">
            <strong>State</strong> <span>{{ address.state }}</span>
          </div>
          <div class="detail-item">
            <strong>Zip Code</strong> <span>{{ address.zipcode }}</span>
          </div>
        </div>
        <router-link to="/home" class="back-link">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useProductStore from "@/stores/store";
const store = useProductStore();

const url = import.meta.env.VITE_APP_URL;
const user = ref<{ id: string; username: string; email: string } | null>(null);
const address = ref<{
  street: string;
  city: string;
  state: string;
  zipcode: string;
} | null>(null);
const router = useRouter();

onMounted(async () => {
  try {
    const token = sessionStorage.getItem("authToken");
    console.log(token);

    if (!token) {
      router.push("/login");
      return;
    }

    const userProfileResponse = await axios.get(`${url}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (userProfileResponse.status === 200) {
      user.value = userProfileResponse.data;
    } else {
      console.error(
        "Failed to load user profile:",
        userProfileResponse.statusText
      );
      alert("Failed to load user profile. Please try again.");
    }

    const addressResponse = await store.fetchAddress();
    console.log(addressResponse);
    console.log("hi");

    if (addressResponse.success) {
      address.value = addressResponse.data;
      console.log(address.value);
    } else {
      console.error("Failed to load address:", addressResponse.statusText);
      alert("Failed to load address. Please try again.");
    }
  } catch (error) {
    console.error("Failed to load profile or address:", error);
    if (error.response && error.response.status === 401) {
      router.push("/login");
    } else {
      alert("An error occurred while loading the profile.");
    }
  }
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  width: 700px;
  margin-left: 40%;
}

.profile-card {
  background-color: antiquewhite;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(5, 4, 4, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-right: 5%;
}

.profile-card h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.profile-details {
  margin-bottom: 20px;
  text-align: left;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-item strong {
  color: #000;
}

.detail-item span {
  color: #007bff;
}

.address-section {
  margin-top: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.address-section h2 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
}

.address-section h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #13ae6b;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>

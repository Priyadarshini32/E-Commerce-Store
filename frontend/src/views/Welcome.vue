<template>
  <v-container class="fill-height" fluid>
    <v-row class="align-center justify-center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title class="headline">
            Welcome to Our E-Commerce Store!
          </v-card-title>
          <v-card-text>
            <p>
              Discover a wide range of products tailored to meet your needs and
              preferences. Our store offers high-quality items at competitive
              prices, ensuring you have the best shopping experience.
            </p>
            <p>
              Enjoy seamless navigation and easy access to all categories, from
              electronics to fashion. We are committed to providing top-notch
              customer service and fast delivery.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click="exploreProducts">
              Start Shopping
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const exploreProducts = () => {
  console.log("Navigating to login page...");
  router.push("/login");
};
</script>

<style scoped>
.fill-height {
  background-image: url("https://media.designrush.com/articles/1628/conversions/_1523977145_341_ecommerce-preview.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 11%;
  width: 1000px;
  height: 800px;
  margin-top: 5%;
}

.headline {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

v-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>

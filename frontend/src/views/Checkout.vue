<template>
  <v-container>
    <v-card>
      <v-card-title>Checkout</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              v-model="customerName"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="customerEmail"
              label="Email"
              required
              type="email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-subtitle>

      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="item in cartItems" :key="item.product.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.product.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Quantity: {{ item.quantity }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Price: ${{ item.product.price.toFixed(2) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-row>
          <v-col>
            <v-subheader>Total:</v-subheader>
            <v-subheader>$ {{ totalPrice.toFixed(2) }}</v-subheader>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="placeOrder" color="primary">Place Order</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="showConfirmation" max-width="400px">
      <v-card>
        <v-card-title class="headline">Order Confirmation</v-card-title>
        <v-card-text>The order is placed successfully!</v-card-text>
        <v-card-actions>
          <v-btn @click="redirectToHome" color="primary">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      customerName: "",
      customerEmail: "",
      showConfirmation: false,
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.items;
    },
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    async placeOrder() {
      try {
        // Retrieve the API token from local storage or other secure storage
        const apiToken = localStorage.getItem("apiToken");

        // Send order request to server
        await axios.post(
          "/api/orders",
          {
            customerName: this.customerName,
            customerEmail: this.customerEmail,
            items: this.cartItems,
          },
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        this.showConfirmation = true; // Show confirmation dialog
      } catch (error) {
        console.error("Order placement failed:", error);
      }
    },
    redirectToHome() {
      this.$router.push("/home"); // Redirect to the home page or another page
    },
  },
};
</script>

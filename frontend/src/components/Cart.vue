<template>
  <div class="container">
    <div class="card">
      <div class="card-title">YOUR CART</div>
      <div v-if="cartItems.length === 0" class="card-subtitle">
        No items in the cart.
      </div>
      <div v-else class="header-table">
        <!-- Custom Header Table -->
        <div class="header">Product Name</div>
        <div class="header">Price</div>
        <div class="header">Quantity</div>
        <div class="header">Actions</div>

        <!-- Cart Items -->
        <div v-for="item in cartItems" :key="item.product.id" class="data-row">
          <div class="item-col">{{ item.product.name }}</div>
          <div class="item-col">Rs. {{ item.product.price }}</div>
          <div class="item-col">{{ item.quantity }}</div>
          <div class="item-col actions-col">
            <span class="icon" @click="removeFromCart(item.product.id)"
              >🗑️</span
            >
          </div>
        </div>
      </div>

      <hr class="divider" />
      <div class="button-container">
        <!-- Center Aligned Place Order Button -->
        <button class="place-order-btn" @click="placeOrder">PLACE ORDER</button>
        <button class="close-btn" @click="navigateToHome">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useProductStore from "@/stores/store";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const { cartItems } = storeToRefs(productStore);
const router = useRouter();

const fetchCartItems = async () => {
  try {
    await productStore.fetchCartItems();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    alert("Failed to fetch cart items. Please try again.");
  }
};

const removeFromCart = async (productId) => {
  try {
    await productStore.removeFromCart(productId);
    await fetchCartItems();
  } catch (error) {
    console.error("Error removing product from cart:", error);
    alert("Failed to remove product from cart. Please try again.");
  }
};

const navigateToHome = () => {
  router.push("/home"); // Assumes a route named 'home' exists
};

const placeOrder = () => {
  // Navigate to Checkout.vue
  router.push("/checkout");
};

onMounted(async () => {
  await fetchCartItems();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-subtitle {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.header-table {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 10px;
  font-weight: bold;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.header {
  text-align: center;
}

.data-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.data-row:nth-child(even) {
  background-color: #f9f9f9;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.place-order-btn,
.close-btn {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.place-order-btn {
  background-color: #007bff;
  color: #fff;
}

.place-order-btn:hover {
  background-color: #0056b3;
}

.close-btn {
  background-color: #6c757d;
  color: #fff;
}

.close-btn:hover {
  background-color: #5a6268;
}

.divider {
  margin: 20px 0;
}

.item-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.actions-col {
  display: flex;
  justify-content: flex-end;
}

.icon {
  cursor: pointer;
  color: red;
  transition: color 0.3s;
}

.icon:hover {
  color: #ff5722;
}
</style>

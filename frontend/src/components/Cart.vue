<template>
  <div class="container">
    <div class="card">
      <div class="card-title">YOUR CART</div>
      <br />
      <div v-if="cartItems.length === 0" class="card-subtitle">
        No items in the cart.
      </div>
      <div v-else>
        <div class="header-table">
          <div class="header">Product Name</div>
          <div class="header">Price</div>
          <div class="header">Quantity</div>
          <div class="header">Actions</div>
        </div>
        <div v-for="item in cartItems" :key="item.product.id" class="data-row">
          <div class="item-col">{{ item.product.name }}</div>
          <div class="item-col">Rs. {{ item.product.price }}</div>
          <div class="item-col">{{ item.quantity }}</div>
          <div class="item-col actions-col">
            <span class="icon" @click="removeFromCart(item.product.id)">
              <v-icon left>mdi-delete</v-icon>
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr class="divider" />
      <div class="button-container">
        <button class="check-out-btn" @click="navigateToCheckout">
          CHECKOUT
        </button>
        <button class="close-btn" @click="navigateToHome">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
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
  router.push("/home");
};

const navigateToCheckout = async () => {
  if (cartItems.value.length === 0) {
    alert(
      "Your cart is empty. Add items to the cart before proceeding to checkout."
    );
    return;
  }
  router.push("/checkout");
};

onMounted(async () => {
  await fetchCartItems();
});
</script>

<style scoped>
.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.container {
  margin-right: auto;
  color: #333;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 14px;
  background-color: #fff;
  margin-top: 20%;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(247, 247, 247, 0.1);
  text-align: center;
}

.card {
  background: #fff;
  width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-left: 20%;
  font-size: 18px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.card-subtitle {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.header-table {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 10px;
  font-weight: bold;
  background: linear-gradient(135deg, #5d5d5d, #969494);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
}

.header {
  text-align: center;
}

.data-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 10px;
  align-items: center;
  padding: 12px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 18px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.check-out-btn,
.close-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.check-out-btn {
  background-color: #25c25f;
  color: #fff;
  font-size: 18px;
}

.check-out-btn:hover {
  background-color: #434649;
}

.close-btn {
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
}

.close-btn:hover {
  background-color: #434649;
}

.item-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.actions-col {
  display: flex;
  justify-content: center;
}

.icon {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s;
}

.icon:hover {
  color: #ff5722;
}
</style>

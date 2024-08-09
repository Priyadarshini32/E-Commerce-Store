<template>
  <div class="container">
    <div class="card">
      <h1 class="card-title">CHECKOUT</h1>
      <br />

      <div class="content-wrapper">
        <!-- Order Details Section -->
        <div class="order-details">
          <h2>Order Details</h2>
          <div class="card-text">
            <table class="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartItems" :key="item.product.id">
                  <td>{{ item.product.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>Rs. {{ item.product.price }}</td>
                  <td>Rs. {{ item.product.price * item.quantity }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="total-label">TOTAL</td>
                  <td class="total-amount">Rs. {{ totalPrice }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <div class="customer-details">
          <h2>Customer Details</h2>
          <div class="card-subtitle">
            <div class="form-row">
              <div class="form-group">
                <label for="name">User Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="username"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="customername"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <div class="address-section">
              <h3>Delivery Address</h3>
              <div class="form-row">
                <div class="form-group">
                  <label
                    for="
streetaddress
"
                    >Street</label
                  >
                  <input
                    id="streetaddress"
                    type="text"
                    v-model="streetaddress"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="city">City</label>
                  <input
                    id="city"
                    type="text"
                    v-model="city"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <br />
              <div class="form-row">
                <div class="form-group">
                  <label for="state">State</label>
                  <input
                    id="state"
                    type="text"
                    v-model="state"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="zipCode">Zip Code</label>
                  <input
                    id="zipCode"
                    type="text"
                    v-model="zip"
                    class="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div class="card-actions">
        <button @click="placeOrder" class="btn btn-primary">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useProductStore from "@/stores/store";

const store = useProductStore();
const router = useRouter();

const username = ref("");
const customername = ref("");

const streetaddress = ref("");
const city = ref("");
const state = ref("");
const zip = ref("");
const cartItems = computed(() => store.cartItems);
const totalPrice = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
);

// Automatically set customer name to the logged-in username
onMounted(() => {
  username.value = sessionStorage.getItem("loggedInUser") || "";
});

const placeOrder = async () => {
  if (
    !username.value ||
    !customername.value ||
    !streetaddress.value ||
    !city.value ||
    !state.value ||
    !zip.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  if (cartItems.value.length === 0) {
    alert("Your cart is empty. Add items before placing an order.");
    return;
  }

  const orderDetails = {
    username: username.value,
    customername: customername.value,
    streetaddress: streetaddress.value,
    city: city.value,
    state: state.value,
    zip: zip.value,
    items: cartItems.value,
    totalAmount: totalPrice.value,
  };

  const response = await store.storeOrder({
    customername: orderDetails.customername,
    streetaddress: orderDetails.streetaddress,
    city: orderDetails.city,
    state: orderDetails.state,
    zip: orderDetails.zip,
    items: orderDetails.items,
    totalprice: orderDetails.totalAmount,
  });

  if (response.status === 1) {
    console.log(response);
    await store.clearCart();
    router.push(`/order/${response.orderId}`);
  } else {
    const err = response?.message;
    alert(err.response.data.errors[0].message);
  }
};
</script>

<style scoped>
/* Container styling */
.container {
  padding: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-top: 10%;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 10px;
  height: 700px;
  width: 1100px;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.order-details,
.customer-details {
  flex: 1;
}

.order-details h2,
.customer-details h2 {
  font-size: 25px;
  font-weight: 100;
  margin-bottom: 15px;
}

.address-section {
  margin-top: 20px;
}

.address-section h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.divider {
  border-top: 2px solid #ddd;
  margin: 20px 0;
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  font-size: 19px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.product-table tfoot tr {
  font-weight: bold;
}

.total-label {
  text-align: right;
}

.total-amount {
  color: #007bff;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn:hover {
  background-color: #0056b3;
}
</style>

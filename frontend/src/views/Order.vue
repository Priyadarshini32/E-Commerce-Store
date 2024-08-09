<template>
  <div class="container">
    <div class="card">
      <h1 class="card-title">Order Confirmation</h1>
      <br />

      <div class="order-sections">
        <div v-if="orderDetails" class="order-details">
          <h2>ORDER DETAILS</h2>
          <table class="order-details-table">
            <tbody>
              <tr>
                <td class="order-info-label">Order ID</td>
                <td class="order-info-value">{{ orderDetails.id }}</td>
              </tr>
              <tr>
                <td class="order-info-label">Customer Name</td>
                <td class="order-info-value">
                  {{ orderDetails.customername }}
                </td>
              </tr>
              <tr>
                <td class="order-info-label">Delivery Address</td>
                <td class="order-info-value">
                  <div>{{ orderDetails.streetaddress }}</div>
                  <div>
                    {{ orderDetails.city }}, {{ orderDetails.state }}
                    {{ orderDetails.zip }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="order-info-label">Total Amount</td>
                <td class="order-info-value">
                  Rs. {{ orderDetails.totalprice }}
                </td>
              </tr>
              <tr>
                <td class="order-info-label">Items</td>
                <td class="order-info-value">
                  <ul>
                    <li
                      v-for="item in orderDetails.items"
                      :key="item.product.id"
                    >
                      {{ item.product.name }} (x{{ item.quantity }})
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Order Confirmation Section on the Right -->
        <div class="order-confirmation">
          <div class="order-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
          <p>
            Order Total:
            <strong>Rs. {{ orderDetails?.totalprice || "N/A" }}</strong>
          </p>
        </div>
      </div>

      <br />
      <br />

      <div class="card-actions">
        <button @click="redirectToHome" class="btn btn-primary">
          Return to Home
        </button>
        <button @click="AllOrders" class="btn btn-secondary">
          View All Orders
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>All ORDERS</h2>
        <br />
        <div class="order-table">
          <div class="table-header">
            <div class="header-cell">Order ID</div>
            <div class="header-cell">Total Amount</div>
            <div class="header-cell">Items</div>
          </div>
          <div v-for="order in orders" :key="order.id" class="table-row">
            <div class="table-cell">{{ order.id }}</div>
            <div class="table-cell">Rs. {{ order.totalprice }}</div>
            <div class="table-cell">
              <ul>
                <li v-for="item in order.items" :key="item.product.id">
                  {{ item.product.name }} (x{{ item.quantity }})
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <button @click="showModal = false" class="btn btn-primary">Back</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/stores/store";
import type { Order } from "@/stores/store";

const orderStore = useStore();
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const orderDetails = ref<Order | null>(null);
const orders = ref<Order[]>([]);

const redirectToHome = () => {
  router.push("/home");
};

const fetchAllOrders = async () => {
  try {
    orders.value = (await orderStore.fetchUserOrders()) || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

const AllOrders = () => {
  fetchAllOrders();
  showModal.value = true;
};

const fetchOrder = async () => {
  const orderId = route.params.id;
  console.log("Order ID:", orderId);

  if (orderId) {
    try {
      orderDetails.value = await orderStore.fetchOrderDetails(Number(orderId));
      console.log("Fetched Order Details:", orderDetails.value);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  }
};

// Fetch the order details and all orders when the component mounts
onMounted(() => {
  fetchOrder();
  fetchAllOrders();
});
</script>

<style scoped>
.container {
  padding: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 700px;
  margin-left: 40%;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.order-sections {
  display: flex;
  justify-content: space-between;
}

.order-confirmation {
  width: 40%;
  margin-bottom: 20px;
  text-align: center;
  margin-left: auto; /* Aligns to the right */
}

.order-icon {
  font-size: 50px;
  color: #28a745;
  margin-bottom: 20px;
}

.order-details {
  width: 55%;
  margin-right: auto; /* Aligns to the left */
}

.order-details h2 {
  margin-bottom: 10px;
  color: black;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.order-details-table {
  width: 100%;
  border-collapse: collapse;
}

.order-details-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.order-info-label {
  font-weight: bold;
  width: 150px;
  text-align: left;
}

.order-info-value {
  text-align: left;
}

.order-info-value ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
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

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.order-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  font-size: 50px;
}

.table-header {
  display: flex;
  background: linear-gradient(135deg, #989898, #eae8e8);
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  padding: 1px;
}

.header-cell {
  flex: 1;
  padding: 12px;
  text-align: left;
  background: linear-gradient(135deg, #8f8c8c, #dad8d8);
  color: #fff;
  font-weight: bold;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.table-cell {
  flex: 1;
  padding: 12px;
  text-align: left;
  font-size: 17px;
  color: #333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(23, 22, 22, 0.1);
  text-align: center;
  height: 700px;
}

.custom-list li {
  margin-bottom: 5px;
  position: relative;
  padding-left: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>

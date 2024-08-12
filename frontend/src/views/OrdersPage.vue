<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <h2 class="modal-title">All Orders</h2>
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
            <ul class="custom-list">
              <li v-for="item in order.items" :key="item.product.id">
                {{ item.product.name }} (x{{ item.quantity }})
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="home" class="btn btn-primary">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useStore from "@/stores/store";
import type { Order } from "@/stores/store";
import { useRouter } from "vue-router";

const router = useRouter();
const orderStore = useStore();
const showModal = ref(true);
const orders = ref<Order[]>([]);

const fetchAllOrders = async () => {
  try {
    orders.value = (await orderStore.fetchUserOrders()) || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};
const home = () => {
  router.push("/home");
};
onMounted(() => {
  fetchAllOrders();
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

.order-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  font-size: 50px;
  border: 1px solid #ccc; /* Added border to the table */
}

.table-header {
  display: flex;
  background: linear-gradient(135deg, #989898, #eae8e8);
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  padding: 1px;
  border-bottom: 2px solid #ccc; /* Added border to the header */
}

.header-cell {
  flex: 1;
  padding: 12px;
  text-align: left;
  background: linear-gradient(135deg, #8f8c8c, #dad8d8);
  color: #fff;
  font-weight: bold;
  border-right: 1px solid #ccc; /* Added border between header cells */
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ccc; /* Added border between rows */
}

.table-cell {
  flex: 1;
  padding: 12px;
  text-align: left;
  font-size: 17px;
  color: #333;
  border-right: 1px solid #ccc; /* Added border between cells */
}

.table-cell:last-child,
.header-cell:last-child {
  border-right: none; /* Remove the border from the last cell */
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.custom-list li {
  margin-bottom: 5px;
  position: relative;
  padding-left: 10px;
  margin-left: 15px;
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

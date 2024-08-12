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

        <!-- Customer Details Section -->
        <div class="customer-details">
          <h2>Customer Details</h2>
          <div class="card-subtitle">
            <div class="form-row">
              <v-text-field label="User Name" v-model="username" readonly>
              </v-text-field>
              <v-text-field
                label="Full Name"
                v-model="customername"
                required
              ></v-text-field>
            </div>
            <br />
            <!-- Delivery Address Section -->
            <div class="address-section">
              <h2>Delivery Address</h2>
              <div v-if="!address.street">
                <p>
                  No address found.
                  <a href="#" @click.prevent="openModal">Create New Address</a>
                </p>
              </div>
              <div v-else>
                <h3>Default Address</h3>
                <div class="address-details">
                  <div class="form-row">
                    <v-text-field
                      label="Street"
                      v-model="address.street"
                      readonly
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="City"
                      v-model="address.city"
                      readonly
                      outlined
                    ></v-text-field>
                  </div>
                  <br />
                  <div class="form-row">
                    <v-text-field
                      label="State"
                      v-model="address.state"
                      readonly
                      outlined
                    ></v-text-field>
                    <v-text-field
                      label="Zip Code"
                      v-model="address.zipcode"
                      readonly
                      outlined
                    ></v-text-field>
                  </div>
                </div>
                <br />
                <v-btn class="btn btn-secondary" @click="openModal">
                  Use Another Address
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div class="card-actions">
        <v-btn @click="placeOrder" class="btn btn-primary">Place Order</v-btn>
      </div>
    </div>

    <!-- Address Modal -->
    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Create New Address</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Street"
                  v-model="newAddress.street"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="City"
                  v-model="newAddress.city"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="State"
                  v-model="newAddress.state"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Zip Code"
                  v-model="newAddress.zipcode"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeModal">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="saveNewAddress">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useProductStore from "@/stores/store";

// Setup store and routing
const store = useProductStore();
const router = useRouter();

// User information and modal control
const username = ref(sessionStorage.getItem("loggedInUser") || "");
const customername = ref("");
const showModal = ref(false);

// New address input model
const newAddress = ref({
  street: "",
  city: "",
  state: "",
  zipcode: "",
});

// Default address model
const address = ref({
  street: "",
  city: "",
  state: "",
  zipcode: "",
});

// Cart items and total price calculation
const cartItems = computed(() => store.cartItems);
const totalPrice = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
);

onMounted(async () => {
  const response = await store.fetchAddress();
  console.log(response.data);

  // Set the fetched address as the default address
  address.value = response.data;
  return response.data;
});

// Place order function
const placeOrder = async () => {
  if (
    !username.value ||
    !customername.value ||
    !address.value.street ||
    !address.value.city ||
    !address.value.state ||
    !address.value.zipcode
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  if (cartItems.value.length === 0) {
    alert("Your cart is empty. Add items before placing an order.");
    return;
  }

  const orderDetails = {
    customername: customername.value,
    streetaddress: address.value.street,
    city: address.value.city,
    state: address.value.state,
    zip: address.value.zipcode,
    items: cartItems.value,
    totalprice: totalPrice.value,
  };

  const response = await store.storeOrder({
    customername: orderDetails.customername,
    streetaddress: orderDetails.streetaddress,
    city: orderDetails.city,
    state: orderDetails.state,
    zip: orderDetails.zip,
    items: orderDetails.items,
    totalprice: orderDetails.totalprice,
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

// Modal handling functions
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveNewAddress = () => {
  // Set the new address as the default address
  address.value = { ...newAddress.value };
  closeModal();
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

.address-section h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.address-section h3 {
  font-size: 15px;
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

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.v-dialog__content--active {
  overflow: visible;
}
</style>

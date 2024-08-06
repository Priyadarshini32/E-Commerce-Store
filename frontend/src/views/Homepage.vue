<template>
  <v-container>
    <h1 class="product-heading">Products</h1>
    <div class="top-bar">
      <v-btn
        @click="navigateToAddProduct"
        color="primary"
        class="add-product-btn"
      >
        Add Product
      </v-btn>
    </div>
    <br />
    <!-- Product Cards -->
    <div class="product-row">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="product-card"
      >
        <v-img :src="product.imageurl || defaultImage" class="product-image" />
        <div class="product-details">
          <h2 class="product-title">{{ product.name }}</h2>
          <p class="product-price">Rs. {{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
          <br />
          <div class="product-actions">
            <button @click="addToCart(product.id, 1)" class="btn btn-primary">
              Add to Cart
            </button>
            <button
              @click="navigateToEditProduct(product.id)"
              class="btn btn-secondary"
            >
              Edit
            </button>
            <button @click="confirmDelete(product.id)" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItemConfirm" color="red">Yes</v-btn>
          <v-btn @click="closeDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <!-- View Cart Button -->
    <v-btn @click="goToCart" color="blue" class="view-cart-btn">
      View Cart
    </v-btn>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <v-btn
        v-if="currentPage > 1"
        @click="goToPreviousPage"
        icon
        class="pagination-btn"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        v-if="hasMoreProducts"
        @click="loadNextPage"
        icon
        class="pagination-btn"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useProductStore from "@/stores/store";
import { storeToRefs } from "pinia";
import type { Product } from "@/stores/store";

const router = useRouter();

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const loading = ref<boolean>(true);
const itemsPerPage = ref<number>(3);
const currentPage = ref<number>(1);
const defaultImage = "path/to/default/image.png";

const displayedProducts = computed<Product[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

const hasMoreProducts = computed<boolean>(() => {
  const totalItems = products.value.length;
  return currentPage.value * itemsPerPage.value < totalItems;
});

// Fetch data
const fetchProductData = async () => {
  loading.value = true;
  try {
    await productStore.fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to fetch product data. Please try again.");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchProductData();
});

const navigateToEditProduct = (id: number) => {
  router.push({ name: "EditProduct", params: { id: id.toString() } });
};

const navigateToAddProduct = () => {
  router.push({ name: "AddProduct" });
};

const goToCart = () => {
  router.push("/cart");
};

// Cart management
const addToCart = async (productId: number, quantity: number) => {
  try {
    await productStore.addToCart(productId, quantity);
    alert("Product added to cart successfully.");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart. Please try again.");
  }
};

// delete
const dialogDelete = ref<boolean>(false);
const itemToDelete = ref<number | null>(null);

const confirmDelete = (id: number) => {
  itemToDelete.value = id;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  if (itemToDelete.value !== null) {
    try {
      await productStore.deleteProduct(itemToDelete.value);
      await fetchProductData();
      closeDelete();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  }
};

// Pagination controls
const loadNextPage = () => {
  if (hasMoreProducts.value) {
    currentPage.value += 1;
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
.product-heading {
  text-transform: uppercase;
  font-weight: bolder;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.product-row {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-left: 10%;
}

.product-card {
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-title {
  font-size: 1.2rem;
  margin: 0;
}

.product-price {
  font-size: 1rem;
  margin: 10px 0;
}

.product-description {
  font-size: 0.9rem;
  color: #555;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 1px;
  height: 45px;
  width: 300px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin: 1px;
}

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-danger {
  background-color: #dc3545;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.add-product-btn {
  margin-right: 16px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-left: 60%;
}

.pagination-btn {
  margin-left: 60%;
}
</style>

<template>
  <v-container>
    <div class="header-container">
      <br />
      <br />
      <h1 class="product-heading">PRODUCTS</h1>
      <br />
      <div class="top-bar">
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          label="Search Products"
          single-line
          hide-details
          class="search-bar"
        ></v-text-field>

        <!-- Categories dropdown -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Select Category"
          class="categories-dropdown"
          @change="filterByCategory"
        ></v-select>

        <v-btn @click="goToCart" color="green" class="view-cart-btn">
          <v-icon left>mdi-cart</v-icon>
          View Cart
        </v-btn>

        <v-btn
          v-if="isAdmin"
          @click="openAddProductModal"
          color="primary"
          class="add-product-btn"
        >
          Add Product
        </v-btn>
      </div>
    </div>
    <br />
    <div class="product-grid">
      <div
        v-for="product in filteredAndSearchedProducts"
        :key="product.id"
        :class="['product-card', { 'admin-card': isAdmin }]"
      >
        <v-img
          :src="product.imageurl || defaultImage"
          class="product-image"
          @click="openImageZoom(product.imageurl || defaultImage)"
        />
        <br />
        <div class="product-details">
          <h2 class="product-title">{{ product.name }}</h2>
          <p class="product-price">Rs. {{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
          <br />
          <div class="product-actions">
            <v-btn @click="addToCart(product.id, 1)" color="primary">
              <v-icon left>mdi-cart</v-icon>
              Add to Cart
            </v-btn>
            <v-btn
              v-if="isAdmin"
              @click="openEditProductModal(product)"
              color="grey"
            >
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
            <v-btn
              v-if="isAdmin"
              @click="confirmDelete(product.id)"
              color="error"
            >
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Dialog -->
    <v-dialog v-model="imageZoomDialog" max-width="800px">
      <v-card>
        <v-img :src="zoomedImageUrl" class="zoomed-image"></v-img>
      </v-card>
    </v-dialog>

    <!-- Existing Dialogs for Deletion and Form Handling -->
    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItemConfirm" color="red">Yes</v-btn>
          <v-btn @click="closeDelete" color="grey">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogForm" max-width="600px">
      <v-card>
        <v-card-text>
          <ProductForm
            :product="selectedProduct || undefined"
            :dialogVisible="dialogForm"
            :categories="categories"
            @form-submit="handleFormSubmit"
            @close-modal="closeForm"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useProductStore from "@/stores/store";
import { storeToRefs } from "pinia";
import ProductForm from "@/components/ProductForm.vue";
import type { Product } from "@/stores/store";

const router = useRouter();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const loading = ref<boolean>(true);
const defaultImage = "/default.jpg";
const searchQuery = ref<string>("");
const selectedCategory = ref<string | null>(null);

const isAdmin = computed<boolean>(() => {
  return sessionStorage.getItem("isAdmin") === "true";
});

const dialogForm = ref<boolean>(false);
const dialogDelete = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);

// Image Zoom Dialog State
const imageZoomDialog = ref<boolean>(false);
const zoomedImageUrl = ref<string>("");

const categories = computed<string[]>(() => {
  const allCategories = products.value.map((product) => product.category);
  return Array.from(new Set(allCategories));
});

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredAndSearchedProducts = computed(() => {
  if (selectedCategory.value) {
    return filteredProducts.value.filter(
      (product) => product.category === selectedCategory.value
    );
  }
  return filteredProducts.value;
});

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

const openEditProductModal = (product: Product) => {
  selectedProduct.value = product;
  dialogForm.value = true;
};

const openAddProductModal = () => {
  selectedProduct.value = null;
  dialogForm.value = true;
};

const goToCart = () => {
  router.push("/cart");
};

const addToCart = async (productId: number, quantity: number) => {
  try {
    await productStore.addToCart(productId, quantity);
    alert("Product added to the cart!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart. Please try again.");
  }
};

const confirmDelete = (id: number) => {
  selectedProduct.value = { id } as Product;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  if (selectedProduct.value && selectedProduct.value.id !== undefined) {
    try {
      await productStore.deleteProduct(selectedProduct.value.id);
      await fetchProductData();
      closeDelete();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  }
};

const handleFormSubmit = async (product: Product) => {
  if (selectedProduct.value && selectedProduct.value.id !== undefined) {
    try {
      const response = await productStore.updateProduct(
        selectedProduct.value.id,
        product
      );
      if (response.status === 1) {
        alert("Product updated successfully");
      } else {
        const err = response.message;
        alert(err.response.data.error[0].message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  } else {
    try {
      const response = await productStore.addProduct(product);
      if (response.status === 1) {
        alert("Product created successfully");
      } else {
        const err = response.message;
        alert(err.response.data.error[0].message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  }
  dialogForm.value = false;
  await fetchProductData();
};

const closeForm = () => {
  dialogForm.value = false;
};

const openImageZoom = (imageUrl: string) => {
  zoomedImageUrl.value = imageUrl;
  imageZoomDialog.value = true;
};

const filterByCategory = () => {
  // Filtering logic is handled by computed properties
};
</script>

<style scoped>
.product-heading {
  font-weight: bolder;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-top: 2%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns in a row */
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
  width: 1200px;
  height: auto;
}

.product-card {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.product-card.admin-card {
  background-color: #f9f9f9; /* Different background for admin */
}

.search-bar {
  max-width: 300px;
  margin-right: 20px;
}

.categories-dropdown {
  margin-right: 20px;
  max-width: 200px;
  margin-top: 2%;
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
  color: #383838;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.btn-primary {
  background-color: #42b983;
  display: flex;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-danger {
  background-color: #dc3545;
}

.top-bar {
  display: flex;
  align-items: center;
}

.add-product-btn {
  margin-left: 16px;
}

.categories-btn {
  margin-left: 16px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-btn {
  margin: 0 5px;
}
</style>

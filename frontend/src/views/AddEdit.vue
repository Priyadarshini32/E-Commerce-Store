<template>
  <div class="form-container">
    <h1 class="form-title">{{ formTitle }}</h1>
    <ProductForm :product="product" @form-submit="handleFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductForm from "@/components/ProductForm.vue";
import useProductStore from "../stores/store";
import type { Product } from "../stores/store";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const isEditMode = route.name === "EditProduct";

const formTitle = computed(() =>
  isEditMode ? "Update Product Details" : "Add New Product"
);

const productId = route.params.id
  ? parseInt(route.params.id as string, 10)
  : undefined;

const product = ref<Product | undefined>(undefined);

onMounted(async () => {
  if (isEditMode && productId !== undefined) {
    const foundProduct = products.value.find((p) => p.id === productId);
    product.value = foundProduct;
    if (!foundProduct) {
      alert("Product not found");
      router.push("/home");
    }
  }
});

async function handleFormSubmit(submittedProduct: Product) {
  try {
    if (isEditMode && productId !== undefined) {
      await productStore.updateProduct(productId, submittedProduct);
      alert("Product updated successfully");
    } else {
      await productStore.addProduct(submittedProduct);
      alert("Product created successfully");
    }

    router.push("/home");
  } catch (err) {
    console.error("Error handling form submission:", err);
    alert("An error occurred. Please try again.");
  }
}
</script>

<style scoped>
.form-container {
  margin-left: 35%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 700px;
}

.form-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
}
</style>

<!-- <template>
  <div class="form-container">
     The form component is used directly in HomePage.vue, so we don't need a separate form here -->
<!-- </div>
</template> -->

<!-- <script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useProductStore from "../stores/store";
import type { Product } from "../stores/store";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const isEditMode = computed(() => route.name === "EditProduct");
const productId = computed(() =>
  route.params.id ? parseInt(route.params.id as string, 10) : undefined
);

const selectedProduct = ref<Product | null>(null);

onMounted(async () => {
  if (isEditMode.value && productId.value !== undefined) {
    const foundProduct = products.value.find((p) => p.id === productId.value);
    selectedProduct.value = foundProduct || null;
    if (!foundProduct) {
      alert("Product not found");
      router.push("/home");
    }
  }
});

async function handleFormSubmit(submittedProduct: Product) {
  if (isEditMode.value && productId.value !== undefined) {
    const response = await productStore.updateProduct(
      productId.value,
      submittedProduct
    );
    if (response.status === 1) {
      alert("Product updated successfully");
    } else {
      alert(response.message);
    }
  } else {
    const response = await productStore.addProduct(submittedProduct);
    if (response.status === 1) {
      alert("Product created successfully");
    } else {
      alert(response.message);
    }
  }
  router.push("/home");
}
</script>

<style scoped>
/* Styles for AddEdit.vue */
.form-container {
  margin-left: 35%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 700px;
  margin-top: 50%;
}

.form-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
}
</style> -->

<template>
  <v-dialog v-model="dialog" width="650px" persistent>
    <v-card class="full-height-card">
      <v-card-title>
        <span :class="headingClass">{{ dialogTitle }}</span>
      </v-card-title>

      <v-card-text class="form-content">
        <v-form @submit.prevent="submitForm">
          <v-container>
            <v-row>
              <v-col cols="4">
                <label class="form-label" for="product-name">Name</label>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="formProduct.name"
                  id="product-name"
                  placeholder="Enter product name"
                  required
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <label class="form-label" for="product-category"
                  >Category</label
                >
              </v-col>
              <v-col cols="8">
                <v-select
                  v-model="selectedCategory"
                  :items="categoryOptions"
                  label="Select or enter category"
                  required
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>

            <v-row v-if="showNewCategoryInput">
              <v-col cols="4">
                <label class="form-label" for="new-category"
                  >New Category</label
                >
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="newCategory"
                  id="new-category"
                  placeholder="Enter new category"
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <label class="form-label" for="product-price">Price</label>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model.number="formProduct.price"
                  id="product-price"
                  placeholder="Enter price"
                  type="number"
                  min="0"
                  required
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <label class="form-label" for="product-description"
                  >Description</label
                >
              </v-col>
              <v-col cols="8">
                <v-textarea
                  v-model="formProduct.description"
                  id="product-description"
                  placeholder="Enter description"
                  auto-grow
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <label class="form-label" for="product-image-url"
                  >Image URL</label
                >
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="formProduct.imageurl"
                  id="product-image-url"
                  placeholder="Enter image URL"
                  hide-details
                  class="custom-placeholder"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="actions">
        <v-btn color="primary" dark class="submit-btn" @click="submitForm">
          Submit
          <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
        </v-btn>

        <v-btn class="cancel-btn" color="orange-darken-2" @click="closeModal">
          <v-icon icon="mdi-arrow-left" start></v-icon>Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Product } from "../stores/store";

const props = defineProps<{
  product?: Product;
  dialogVisible: boolean;
  categories: string[]; // Pass categories as a prop
}>();

const emit = defineEmits<{
  (event: "form-submit", product: Product): void;
  (event: "close-modal"): void;
}>();

const dialog = ref(props.dialogVisible);

const formProduct = ref<Product>({
  id: props.product?.id ?? 0,
  category: props.product?.category ?? "",
  name: props.product?.name ?? "",
  price: props.product?.price ?? 0,
  description: props.product?.description ?? "",
  imageurl: props.product?.imageurl ?? "",
});

const newCategory = ref<string>("");

const categoryOptions = computed(() => {
  return [...props.categories, "Other"];
});

const showNewCategoryInput = computed(() => {
  return selectedCategory.value === "Other";
});

const selectedCategory = ref(props.product?.category ?? "");

const dialogTitle = computed(() => {
  return formProduct.value.id === 0 ? "Add Product" : "Edit Product";
});

const headingClass = computed(() => {
  return formProduct.value.id === 0 ? "headline-add" : "headline-edit";
});

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formProduct.value = { ...newProduct };
      selectedCategory.value = newProduct.category;
      newCategory.value = ""; // Reset new category input
    } else {
      formProduct.value = {
        id: 0,
        category: "",
        name: "",
        price: 0,
        description: "",
        imageurl: "",
      };
      selectedCategory.value = "";
      newCategory.value = ""; // Reset new category input
    }
  },
  { immediate: true }
);

watch(
  () => props.dialogVisible,
  (newValue) => {
    dialog.value = newValue;
  }
);

function closeModal() {
  dialog.value = false;
  emit("close-modal");
}

function submitForm() {
  if (validateForm()) {
    const category =
      selectedCategory.value === "Other"
        ? newCategory.value
        : selectedCategory.value;
    const product: Product = { ...formProduct.value, category };
    emit("form-submit", product);
    closeModal();
  }
}

function validateForm(): boolean {
  if (!formProduct.value.name || formProduct.value.price <= 0) {
    alert("Please provide valid product details.");
    return false;
  }
  if (!selectedCategory.value && !newCategory.value) {
    alert("Please select or enter a category.");
    return false;
  }
  return true;
}
</script>

<style scoped>
.full-height-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-content {
  overflow-y: auto;
  flex: 1;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.submit-btn {
  margin-right: 8px;
}

.cancel-btn {
  margin-left: 8px;
}

.headline-add {
  font-size: 1.5rem;
  color: green;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
}

.headline-edit {
  font-size: 1.5rem;
  color: orange;
}

.font {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande";
}

.form-label {
  font-size: 15px;
  font-family: cursive;
  font-weight: 400;
}
</style>

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

// Props & Emit setup
const props = defineProps<{
  product?: Product;
  dialogVisible: boolean; // New prop to control dialog visibility
}>();

const emit = defineEmits<{
  (event: "form-submit", product: Product): void;
  (event: "close-modal"): void; // Emit event to close the modal
}>();

// Reactive References
const dialog = ref(props.dialogVisible);

// Initialize formProduct with an empty product if props.product is undefined
const formProduct = ref<Product>({
  id: props.product?.id ?? 0,
  name: props.product?.name ?? "",
  price: props.product?.price ?? 0,
  description: props.product?.description ?? "",
  imageurl: props.product?.imageurl ?? "",
});

// Computed Properties
const dialogTitle = computed(() => {
  return formProduct.value.id === 0 ? "Add Product" : "Edit Product";
});

const headingClass = computed(() => {
  return formProduct.value.id === 0 ? "headline-add" : "headline-edit";
});

// Watcher to update form data if props change
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formProduct.value = { ...newProduct };
    } else {
      formProduct.value = {
        id: 0,
        name: "",
        price: 0,
        description: "",
        imageurl: "",
      }; // Reset to default if no product is provided
    }
  },
  { immediate: true }
);

watch(
  () => props.dialogVisible,
  (newValue) => {
    dialog.value = newValue; // Sync dialog visibility with prop
  }
);

// Methods
function closeModal() {
  dialog.value = false;
  emit("close-modal"); // Emit event to inform parent to close the dialog
}

function submitForm() {
  if (validateForm()) {
    // Ensure formProduct is a valid Product
    const product: Product = { ...formProduct.value };
    emit("form-submit", product);
    closeModal();
  }
}

function validateForm(): boolean {
  if (!formProduct.value.name || formProduct.value.price <= 0) {
    alert("Please provide valid product details.");
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

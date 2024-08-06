import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageurl: string | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const url = import.meta.env.VITE_APP_URL;
const cartUrl = `${url}/cart`;

const useProductStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);
  const cartItems = ref<CartItem[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const token = sessionStorage.getItem("authToken");

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        isLoading.value = false;
        return;
      }
      const response = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      products.value = response.data;
      console.log(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to fetch products";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error fetching products:", error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (inputData: Omit<Product, "id">) => {
    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        isLoading.value = false;
        return;
      }
      await axios.post(`${url}/products/add`, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchProducts();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to add product";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error adding product:", error.value);
    }
  };

  const updateProduct = async (id: number, inputData: Product) => {
    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        isLoading.value = false;
        return;
      }
      await axios.put(`${url}/products/${id}`, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchProducts();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to update product";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error updating product:", error.value);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!token) {
      error.value = "Authorization token is missing";
      console.error(error.value);
      return;
    }

    try {
      await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchProducts();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to delete product";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error deleting product:", error.value);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        return;
      }
      await axios.post(
        `${cartUrl}/add`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCartItems();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to add product to cart";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error adding product to cart:", error.value);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        return;
      }
      await axios.post(
        `${cartUrl}/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCartItems();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to remove product from cart";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error removing product from cart:", error.value);
    }
  };

  const fetchCartItems = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token) {
        error.value = "Authorization token is missing";
        console.error(error.value);
        isLoading.value = false;
        return;
      }
      const response = await axios.get(cartUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cartItems.value = response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to fetch cart items";
      } else {
        error.value = "An unknown error occurred";
      }
      console.error("Error fetching cart items:", error.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    products,
    cartItems,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchCartItems,
    addToCart,
    removeFromCart,
  };
});

export default useProductStore;

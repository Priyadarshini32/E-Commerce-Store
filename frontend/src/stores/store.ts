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

export type Order = {
  id: number;
  customername: string;
  streetaddress: string;
  city: string;
  state: string;
  zip: string;
  items: CartItem[];
  totalprice: number;
  orderDate: string;
};

const url = import.meta.env.VITE_APP_URL;
const cartUrl = `${url}/cart`;
const orderUrl = `${url}/orders`;
const errorMessage = ref("");
const useProductStore = defineStore("productStore", () => {
  const orders = ref<Order[]>([]);
  const products = ref<Product[]>([]);
  const cartItems = ref<CartItem[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const token = ref<string | null>(sessionStorage.getItem("authToken"));
  const userId = ref<number | null>(
    sessionStorage.getItem("userId")
      ? Number(sessionStorage.getItem("userId"))
      : null
  ); // Assuming the userId is stored as a string

  const setAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      const response = await axios.get(`${url}/products`, setAuthHeader());
      products.value = response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to fetch products";
      } else {
        error.value = "An unknown error occurred";
      }
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (inputData: Omit<Product, "id">) => {
    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return { status: 0, message: "Authorization token is missing" };
      }
      const response = await axios.post(
        `${url}/products/add`,
        inputData,
        setAuthHeader()
      );
      console.log(response.data);
      await fetchProducts();
      return { status: 1, message: {} };
    } catch (errors) {
      console.log("Error in addProduct:", errors);
      return {
        status: 0,
        message: errors || "An unexpected error occurred",
      };
    }
  };

  const updateProduct = async (id: number, inputData: Product) => {
    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      const response = await axios.put(
        `${url}/products/${id}`,
        inputData,
        setAuthHeader()
      );
      console.log(response.data);

      await fetchProducts();
      return { status: 1, message: {} };
    } catch (errors) {
      console.log("Error in UpdateProduct:", errors);
      return {
        status: 0,
        message: errors || "An unexpected error occurred",
      };
    }
  };

  const deleteProduct = async (id: number) => {
    if (!token.value) {
      error.value = "Authorization token is missing";
      return;
    }

    try {
      await axios.delete(`${url}/products/${id}`, setAuthHeader());
      await fetchProducts();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to delete product";
      } else {
        error.value = "An unknown error occurred";
      }
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      await axios.post(
        `${cartUrl}/add`,
        { productId, quantity },
        setAuthHeader()
      );
      await fetchCartItems();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to add product to cart";
      } else {
        error.value = "An unknown error occurred";
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      await axios.delete(`${cartUrl}/remove`, {
        headers: setAuthHeader().headers,
        params: { productId },
      });
      await fetchCartItems();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to remove product from cart";
      } else {
        error.value = "An unknown error occurred";
      }
    }
  };

  const fetchCartItems = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      const response = await axios.get(cartUrl, setAuthHeader());
      cartItems.value = response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to fetch cart items";
      } else {
        error.value = "An unknown error occurred";
      }
    } finally {
      isLoading.value = false;
    }
  };

  const clearCart = async () => {
    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      await axios.delete(`${cartUrl}/clear`, setAuthHeader());
      cartItems.value = [];
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to clear cart items";
      } else {
        error.value = "An unknown error occurred";
      }
    }
  };

  const fetchUserOrders = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      const response = await axios.get(`${orderUrl}/view`, setAuthHeader());
      console.log(response.data.data);
      return response.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data?.message || "Failed to fetch orders";
      } else {
        error.value = "An unknown error occurred";
      }
    } finally {
      isLoading.value = false;
    }
  };

  const storeOrder = async (inputData: Omit<Order, "id" | "orderDate">) => {
    if (!token.value) {
      error.value = "Authorization token is missing";
      return;
    }

    // Extract fields from inputData
    const { customername, streetaddress, city, state, zip, items, totalprice } =
      inputData;

    // Prepare orderData
    const orderData = {
      customername: customername,
      items: JSON.stringify(items),
      totalprice: totalprice,
      streetaddress: streetaddress,
      city: city,
      state: state,
      zipcode: zip,
    };

    try {
      const response = await axios.post(
        `${orderUrl}/add`,
        orderData,
        setAuthHeader()
      );
      console.log(response.data);
      fetchUserOrders();
      return { status: 1, orderId: response.data.data.id, message: {} };
    } catch (errors) {
      console.log(errors);
      return {
        status: 0,
        orderId: 0,
        message: errors,
      };
    }
  };

  const fetchOrderDetails = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!token.value) {
        error.value = "Authorization token is missing";
        return;
      }
      const response = await axios.get(
        `${orderUrl}/show/${id}`,

        setAuthHeader()
      );
      console.log(response.data.data);

      return response.data.data; // Return the order details from the response
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message || "Failed to fetch order details";
      } else {
        error.value = "An unknown error occurred";
      }
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
    addToCart,
    removeFromCart,
    fetchCartItems,
    clearCart,
    orders,
    fetchUserOrders,
    fetchOrderDetails,
    storeOrder,
  };
});

export default useProductStore;

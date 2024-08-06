import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Welcome from "../views/Welcome.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";
import Cart from "@/views/Cart.vue";
import AddEdit from "@/views/AddEdit.vue";
import Checkout from "@/views/Checkout.vue";

// Define your routes
const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "Homepage",
    component: Homepage,
    meta: { requiresAuth: true },
  },
  {
    path: "/add",
    name: "AddProduct",
    component: AddEdit,
    props: { mode: "add" }, // Pass mode as a prop to differentiate between add and edit
  },
  {
    path: "/edit/:id",
    name: "EditProduct",
    component: AddEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { requiresAuth: true },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem("authToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login page with a message if not authenticated
    next({
      name: "Login",
      query: { message: "Please log in to access this page." },
    });
  } else {
    next();
  }
});

export default router;

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
  }),
  actions: {
    login(token: string, username: string) {
      this.isLoggedIn = true;
      this.isAdmin = username === "Priya";
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("loggedInUser", username);
      sessionStorage.setItem("isAdmin", this.isAdmin.toString());
    },
    logout() {
      this.isLoggedIn = false;
      this.isAdmin = false;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("isAdmin");
    },
    checkAuthStatus() {
      this.isLoggedIn = !!sessionStorage.getItem("authToken");
      this.isAdmin = sessionStorage.getItem("isAdmin") === "true";
    },
  },
});

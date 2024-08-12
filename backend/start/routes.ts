/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/register", "AuthController.register"),
    Route.post("/login", "AuthController.login");
    Route.get("/profile", "AuthController.profile");
}).prefix("users");

Route.group(() => {
  Route.get("/products", "ProductsController.index");
  Route.put("/products/:id", "ProductsController.update").where(
    "id",
    /^[0-9]+$/
  );
  Route.post("/products/add", "ProductsController.store");
  Route.delete("/products/:id", "ProductsController.delete").where(
    "id",
    /^[0-9]+$/
  );
}).middleware("Auth");

Route.group(() => {
  Route.post("/add", "CartController.addToCart");
  Route.delete("/remove", "CartController.removeFromCart");
  Route.get("/", "CartController.getCartItems");
  Route.delete("/clear", "CartController.clearCart");
})
  .prefix("/cart")
  .middleware("Auth");

Route.group(() => {
  Route.post("/add", "OrdersController.store");
  Route.get("/view", "OrdersController.index");
  Route.get("/show/:id", "OrdersController.show").where("id", /^[0-9]+$/);
  Route.get("/:username", "OrdersController.fetchAddress");
})
  .prefix("/orders")
  .middleware("Auth");

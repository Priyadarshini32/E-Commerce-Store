import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cart from "App/Models/Cart";
import Product from "App/Models/Product";

export default class CartController {
  public async addToCart({ request, response, auth }: HttpContextContract) {
    const { productId, quantity } = request.only(["productId", "quantity"]) as {
      productId: number;
      quantity: number;
    };

    if (quantity <= 0) {
      return response.badRequest({
        message: "Quantity must be greater than zero.",
      });
    }

    try {
      const userId = auth.user!.id;

      await Product.findOrFail(productId);

      const existingCartItem = await Cart.query()
        .where("productId", productId)
        .andWhere("userId", userId)
        .first();

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        await Cart.create({ productId, quantity, userId });
      }

      return response.ok({ message: "Product added to cart." });
    } catch (error) {
      console.error("Error adding to cart:", error);

      return response.badRequest({
        message: "Failed to add product to cart.",
        error: error.message,
      });
    }
  }

  public async removeFromCart({
    request,
    response,
    auth,
  }: HttpContextContract) {
    try {
      const userId = auth.user!.id;

      const { productId } = request.only(["productId"]) as {
        productId: number;
      };

      console.log("Removing product with ID:", productId);

      const affectedRows = await Cart.query()
        .where("productId", productId)
        .andWhere("userId", userId)
        .delete();

      if (typeof affectedRows === "number" && affectedRows === 0) {
        return response.status(404).json({
          success: false,
          message: "Product not found in your cart.",
        });
      }

      return response.ok({
        success: true,
        message: "Product removed from cart.",
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);

      return response.badRequest({
        success: false,
        message: "Failed to remove product from cart.",
        error: error.message,
      });
    }
  }

  public async getCartItems({ response, auth }: HttpContextContract) {
    try {
      const userId = auth.user!.id;

      const cartItems = await Cart.query()
        .where("userId", userId)
        .preload("product");

      return response.ok(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);

      return response.badRequest({
        message: "Failed to fetch cart items.",
        error: error.message,
      });
    }
  }

  public async clearCart({ response, auth }: HttpContextContract) {
    try {
      const userId = auth.user!.id;

      console.log("Clearing cart for user ID:", userId);

      const affectedRows = await Cart.query().where("userId", userId).delete();

      console.log("Number of rows affected:", affectedRows);

      if (typeof affectedRows === "number" && affectedRows === 0) {
        return response.ok({
          success: true,
          message: "Cart is already empty.",
        });
      }

      return response.ok({
        success: true,
        message: "Cart cleared successfully.",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);

      return response.badRequest({
        success: false,
        message: "Failed to clear cart items.",
        error: error.message,
      });
    }
  }
}

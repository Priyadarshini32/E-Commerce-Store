import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Order from "App/Models/Order";
import User from "App/Models/User";
import OrderValidator from "App/Validators/OrderValidator";

export default class OrdersController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate({
        schema: new OrderValidator({} as HttpContextContract).storeSchema,
        messages: new OrderValidator({} as HttpContextContract).messages,
      });
      console.log(validatedData);
      const {
        customername,
        items,
        totalprice,
        streetaddress,
        city,
        state,
        zipcode,
      } = validatedData;

      const userId = auth.user?.id;

      if (!userId) {
        return response.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      let parsedItems;
      try {
        if (typeof items === "string") {
          parsedItems = JSON.parse(items);
          if (!Array.isArray(parsedItems)) {
            throw new Error("Items should be an array");
          }
        } else if (Array.isArray(items)) {
          parsedItems = items;
        } else {
          throw new Error("Invalid items format");
        }
      } catch (error) {
        return response.status(400).json({
          success: false,
          message: "Invalid items format",
          error: error.message,
        });
      }

      const order = await Order.create({
        userId: userId,
        customername,
        items: JSON.stringify(parsedItems),
        totalprice,
        streetaddress,
        city,
        state,
        zipcode,
      });

      return response.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error creating order:", error);

      if (error.messages) {
        return response.status(422).json({
          success: false,
          message: "Validation failed",
          errors: error.messages.errors,
        });
      }

      return response.status(500).json({
        success: false,
        message: "Unable to create order",
        error: error.message,
      });
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    try {
      const userId = auth.user?.id;

      if (!userId) {
        return response.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      const orders = await Order.query()
        .preload("user")
        .where("user_id", userId);

      return response.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return response.status(500).json({
        success: false,
        message: "Unable to fetch orders",
        error: error.message || "Internal Server Error",
      });
    }
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const id = params.id;

      const userId = auth.user?.id;

      if (!userId) {
        return response.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      const order = await Order.query()
        .preload("user")
        .where("id", id)
        .where("user_id", userId)
        .firstOrFail();

      return response.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error("Error fetching order:", error);

      const isNotFoundError =
        error.name === "ModelNotFoundException" ||
        error.message.includes("Model not found");

      return response.status(isNotFoundError ? 404 : 500).json({
        success: false,
        message: isNotFoundError ? "Order not found" : "Unable to fetch order",
        error: error.message || "Internal Server Error",
      });
    }
  }
  public async fetchAddress({ params, auth, response }: HttpContextContract) {
    try {
      const username = params.username;
      const authuserId = auth.user?.id;

      if (!authuserId) {
        return response.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      const user = await User.findBy("username", username);

      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const userId = user.id;
      const fetchedUsername = user.username;
      console.log("Fetched Username:", fetchedUsername);

      if (!userId) {
        return response.status(400).json({
          success: false,
          message: "User ID is undefined",
        });
      }

      const order = await Order.query()
        .where("user_id", userId)
        .select("streetaddress", "city", "state", "zipcode")
        .first();

      if (!order) {
        return response.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      return response.status(200).json({
        success: true,
        data: {
          street: order.streetaddress,
          city: order.city,
          state: order.state,
          zipcode: order.zipcode,
        },
      });
    } catch (error) {
      console.error("Error fetching address:", error);
      return response.status(500).json({
        success: false,
        message: "Unable to fetch address",
        error: error.message || "Internal Server Error",
      });
    }
  }
}

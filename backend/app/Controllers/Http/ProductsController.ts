import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import ProductValidator from "App/Validators/ProductValidator";

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    try {
      const products = await Product.query().orderBy("price", "desc");

      console.log(products);

      return response.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);

      return response.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const productId = request.param("id");

      const product = await Product.find(productId);

      if (!product) {
        return response.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const validatedData = await request.validate(ProductValidator);
      product.merge(validatedData);
      await product.save();

      return response.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error updating product:", error);

      return response.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.messages.errors,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate(ProductValidator);

      // Create a new product with validated data
      const product = await Product.create(validatedData);

      return response.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error creating product:", error);

      return response.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.messages.errors,
      });
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const productId = request.param("id");

      const product = await Product.find(productId);

      if (!product) {
        return response.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await product.delete();

      return response.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);

      return response.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  }
}

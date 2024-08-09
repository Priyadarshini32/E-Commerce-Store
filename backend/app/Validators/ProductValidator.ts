import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.maxLength(50),
      rules.minLength(5),
      rules.required(),
      rules.unique({ table: "products", column: "name" }),
    ]),
    description: schema.string({}, [
      rules.maxLength(300),
      rules.minLength(30),
      rules.required(),
    ]),
    price: schema.number([rules.range(0, 100000), rules.required()]),
    imageurl: schema.string.optional({}, [rules.url()]),
  });

  public messages: CustomMessages = {
    "name.required": "Product name is required.",
    "name.maxLength": "Product name must not exceed 50 characters.",
    "name.minLength": "Product name must be at least 5 characters long.",
    "name.unique": "Product name must be unique. This name is already taken.",

    "description.required": "Product description is required.",
    "description.maxLength":
      "Product description must not exceed 300 characters.",
    "description.minLength":
      "Product description must be at least 30 characters long.",

    "price.required": "Product price is required.",
    "price.range": "Product price must be between 0 and 100,000.",

    "imageurl.url": "Image URL must be a valid URL.",
  };
}

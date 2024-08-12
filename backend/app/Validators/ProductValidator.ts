import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category: schema.string({}, [rules.required(), rules.maxLength(20)]),

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
    price: schema.number([rules.range(0, 10000000), rules.required()]),
    imageurl: schema.string.optional({}, [rules.url()]),
  });

  public messages: CustomMessages = {
    "category.required": "Product category is required.",
    "category.maxlength": "Product category must not exceed 20 characters.",

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
    "price.range": "Product price must be between 0 and 10,000,000.",

    "imageurl.url": "Image URL must be a valid URL.",
  };
}

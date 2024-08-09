import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class OrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public storeSchema = schema.create({
    customername: schema.string(),
    items: schema.string(),
    totalprice: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(0.01, 1000000), // Example range for total price
    ]),
    streetaddress: schema.string({}, [
      rules.required(),
      rules.maxLength(500),
      rules.minLength(10),
    ]),
    city: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
      rules.minLength(2),
    ]),
    state: schema.string({}, [
      rules.required(),
      rules.maxLength(255),
      rules.minLength(2),
    ]),
    zipcode: schema.string({}, [
      rules.required(),
      rules.minLength(5),
      rules.maxLength(10),
      rules.regex(/^\d+$/), // Ensures that the zipcode contains only numbers
    ]),
  });

  public showSchema = schema.create({
    id: schema.number([
      rules.required(),
      rules.exists({ table: "orders", column: "id" }),
    ]),
  });

  public messages = {
    "totalprice.range": "Total price must be between 0.01 and 100000",
    "streetaddress.required": "Street address is required",
    "streetaddress.maxLength": "Street address cannot exceed 500 characters",
    "streetaddress.minLength":
      "Street address must be at least 10 characters long",
    "city.required": "City is required",
    "city.maxLength": "City cannot exceed 255 characters",
    "city.minLength": "City must be at least 2 characters long",
    "state.required": "State is required",
    "state.maxLength": "State cannot exceed 255 characters",
    "state.minLength": "State must be at least 2 characters long",
    "zipcode.required": "Zipcode is required",
    "zipcode.minLength": "Zipcode must be at least 5 characters long",
    "zipcode.maxLength": "Zipcode cannot exceed 10 characters",
    "zipcode.regex": "Zipcode must contain only numbers",
    "id.required": "Order ID is required",
    "id.exists": "Order with this ID does not exist",
  };
}

import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
      rules.required(),
      rules.maxLength(20),
      rules.minLength(5),
      rules.unique({ table: "users", column: "username" }),
    ]),

    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),

    password: schema.string({}, [
      rules.required(),
      rules.minLength(5),
      rules.maxLength(20),
      rules.regex(/(?=.*[A-Z])(?=.*\W)/),
    ]),
  });

  public messages: CustomMessages = {
    "username.required": "Username is required",
    "username.unique": "Username is already taken",
    "username.minLength": "Username must be at least 5 characters long",
    "username.maxLength": "Username must not exceed 30 characters",
    "email.required": "Email is required",
    "email.email": "Email must be a valid email address",
    "email.unique": "Email is already taken",
    "password.required": "Password is required",
    "password.minLength": "Password must be at least 5 characters long",
    "password.regex":
      "Password must contain at least one uppercase letter and one special character",
  };
}

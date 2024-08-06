import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import RegValidator from "App/Validators/RegValidator";

export default class AuthController {
  public async register({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(RegValidator);
    const username = data.username;
    const email = data.email;
    const password = data.password;
    try {
      const user = await User.create({ username, email, password });
      const token = await auth.login(user);

      console.log(token.token);

      return token.token;
    } catch (error) {
      console.error("Registration error:", error);
      return response
        .status(400)
        .json({ message: "Registration failed", error: error.message });
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { username, password } = request.only(["username", "password"]);

    try {
      const token = await auth.use("api").attempt(username, password);
      console.log(token);
      return response.ok(token.token);
    } catch (error) {
      return response.unauthorized("Invalid Credentials");
    }
  }
}

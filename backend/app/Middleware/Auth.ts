import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Auth {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      await auth.use("api").authenticate();
      await next();
    } catch (error) {
      console.error("Authentication error:", error);
      return response.status(401).json({
        success: false,
        message: "Authentication failed",
        error: error.message,
      });
    }
  }
}

import Server from "@ioc:Adonis/Core/Server";

Server.middleware.register([() => import("@ioc:Adonis/Core/BodyParser")]);

Server.middleware.registerNamed({
  Auth: () => import("App/Middleware/Auth"), // Import your custom Auth middleware
});

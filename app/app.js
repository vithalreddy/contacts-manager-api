module.exports = () => {
  const express = require("express");
  const cors = require("cors");
  const compress = require("compression");
  const helmet = require("helmet");

  const { server, apiBaseUrl } = require("../config");
  const routes = require("./routes");
  const { errorHandler, auth: authMiddleware } = require("./middlewares");

  process.on("unhandledRejection", function(reason, promise) {
    console.log("unhandledRejection error");
    console.log(reason);
    console.log(promise);
    // process.exit(1); //process exit with error code in dev env only
  });

  process.on("warning", warning => {
    console.log("warning error");
    console.log(warning);
    console.warn(warning.name); // Print the warning name
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // disabling due security reasons
  app.disable("x-powered-by");

  // middleware to compress res data
  app.use(compress());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // csp header
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"]
      }
    })
  );

  app.use(
    cors({
      optionsSuccessStatus: 200
    })
  );

  app.use(apiBaseUrl, authMiddleware, routes);

  app.use(errorHandler);

  app.listen(server.port, () => {
    console.info(
      `Contact-Manager Server Running on http://127.0.0.1:${server.port}.`
    );
  });

  return app;
};

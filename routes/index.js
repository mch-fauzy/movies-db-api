const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const {userRouter, movieRouter} = require("./v1")
const { logger } = require('../utils');
const CONFIG = require('../configs');
const SWAGGER_CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css";


const v1Routes = [
    {
      path: '/v1',
      route: userRouter,
    },
    {
      path: '/v1',
      route: movieRouter,
    },
];

const swaggerRoutes = [
    {
      path: '/',
      route: swaggerUi.serve,
      docs: swaggerUi.setup(swaggerDocument, { customCssUrl: SWAGGER_CSS_URL }),
    },
];

v1Routes.forEach((route) => {
    router.use(route.path, route.route);
});

// API docs
if (CONFIG.DOCS === "enabled") {
    swaggerRoutes.forEach((route) => {
        router.use(route.path, route.route, route.docs);
        logger.info(`Swagger documentation enabled. url=http://localhost:${CONFIG.SERVER.PORT}${route.path}`);
    });
}

module.exports = router;

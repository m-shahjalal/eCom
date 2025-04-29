const home = require("./home");
const user = require("./user");
const admin = require("./admin");
const product = require("./product");
const order = require("./order");

const routes = [
  {
    path: "/",
    router: home,
  },
  {
    path: "/users",
    router: user,
  },
  {
    path: "/products",
    router: product,
  },
  {
    path: "/orders",
    router: order,
  },
  {
    path: "/admin",
    router: admin,
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use(`/api${route.path}`, route.router);
  });
};

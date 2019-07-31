const Routes = require("express").Router();
const catchErrors = require("../middlewares/catchErrors");

const authCtrl = require("../controllers/auth.controller");
const contactCtrl = require("../controllers/contact.controller");

Routes.route("/contacts")
  .get(catchErrors(contactCtrl.getAll))
  .post(catchErrors(contactCtrl.create))
  .put(catchErrors(contactCtrl.create));

Routes.post("/auth/login", catchErrors(authCtrl.publish));
Routes.post("/auth/register", catchErrors(authCtrl.publish));

module.exports = Routes;

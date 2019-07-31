const Routes = require("express").Router();
const catchErrors = require("../middlewares/catchErrors");

// Blog Routes
// const userCtrl = require("../controllers/contact.controller");

// Routes.route("/blogs")
//   .get(catchErrors(userCtrl.getAllPublished))
//   .post(catchErrors(userCtrl.create));

// Routes.route("/blogs/all").get(catchErrors(userCtrl.getAll));

// Routes.route("/blogs/:blogId")
//   .get(catchErrors(userCtrl.get))
//   .delete(catchErrors(userCtrl.delete));

// Routes.route("/blogs/:blogId/publish").post(catchErrors(userCtrl.publish));

module.exports = Routes;

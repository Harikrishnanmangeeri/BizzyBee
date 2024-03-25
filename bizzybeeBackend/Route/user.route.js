const express = require("express");
var userRouter = express.Router();
const controller = require("../Controller/user.controller");
const auth = require("../Middlewares/jwt.user");

userRouter.post("/user/registration", controller.registration);
userRouter.post("/user/login", controller.login);
userRouter.get("/user/profile", auth, controller.profile);
userRouter.post("/user/Addproducts", auth, controller.addproducts);
userRouter.get("/user/showproducts", controller.showproducts);
userRouter.post("/user/addrent", auth, controller.addrent);
userRouter.put("/user/edit", auth, controller.rentedit);
userRouter.get("/user/renthistory", controller.rentHistory);

module.exports = userRouter;

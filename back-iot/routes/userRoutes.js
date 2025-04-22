const express = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  signup,
  signIn,
  prottectorMW,
} = require("../controllers/userController");
const Routes = express.Router(); ////////////ytsan3ou a partir ml express

Routes.route("/").post(createUser); /////.get(createUser)///// route t5aleha ferghaa mta l creation bch tbdech route mafrouchaa
//////(Routes).//post("/",createUser)//////////kifha
Routes.route("/:id").patch(updateUser); /////////routage dynamique (:id => un var mahyech caractere )
Routes.route("/:id").delete(deleteUser);
Routes.route("/:id").get(getUser);
Routes.route("/").get(prottectorMW, getUsers);
Routes.route("/signup").post(signup);
Routes.route("/signIn").post(signIn);

module.exports = Routes;

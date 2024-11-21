const router = require("express").Router();
const adminController = require("../controllers/admin-controller");

router.route("/login").post(adminController.login);
router.route("/logout").post(adminController.logout);

module.exports = router;

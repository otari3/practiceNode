const express = require("express");
const router = express.Router();
const authControler = require("../controllers/auth");
router.get("/userlogin", authControler.getSingUp);
router.post("/userlogin", authControler.login);
router.post("/logout", authControler.logout);

module.exports = router;

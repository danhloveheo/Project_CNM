const express = require("express");
const router = express.Router();

const { register, login, resendIdToken } = require("./../controllers/user-controllers");
const { authenticateIdToken } = require("./../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.post("/resend-idtoken", resendIdToken);

router.use(authenticateIdToken);

// router.get("/secure", (req, res) => {
// 	res.send({
// 		message: "I am secured...",
// 		decoded: req.decoded
// 	});
// });

module.exports = router;
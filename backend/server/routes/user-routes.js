const express = require("express");
const router = express.Router();

const { register, login, resendIdToken } = require("./../controllers/user-controllers");
const { authenticateIdToken } = require("./../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.post("/resend-idtoken", resendIdToken);

// Request đến các route từ đây xuống cần có header "x-auth" chứa giá trị idToken
router.use(authenticateIdToken);

// router.get("/secure", (req, res) => {
// 	res.send({
// 		message: "I am secured...",
// 		decoded: req.decoded
// 	});
// });

module.exports = router;

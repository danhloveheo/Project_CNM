const express = require("express");
const router = express.Router();

const { calPrice } = require("./../controllers/rider-controllers");

router.post("/cal-price", calPrice);

module.exports = router;

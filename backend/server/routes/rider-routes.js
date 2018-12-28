const express = require("express");
const router = express.Router();

const { distance } = require("./../controllers/rider-controllers");

router.post("/distance", distance);

module.exports = router;

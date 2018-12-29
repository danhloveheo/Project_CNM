const express = require("express");
const router = express.Router();

const { distance } = require("../controllers/places-controllers");

router.post("/distance", distance);

module.exports = router;

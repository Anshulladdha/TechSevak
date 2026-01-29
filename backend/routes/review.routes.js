const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const { createReview } = require("../controllers/review.controller");
console.log("✅ review routes loaded");
router.post(
  "/create",
  auth,
  role(["USER"]),
  createReview
);

router.get("/test", (req, res) => {
    res.send("review route ok");
  });


module.exports = router;
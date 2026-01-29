const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  userDashboard,
  engineerDashboard,
  adminDashboard
} = require("../controllers/dashboard.controller");

router.get(
  "/user",
  auth,
  role(["USER"]),
  userDashboard
);

router.get(
  "/engineer",
  auth,
  role(["ENGINEER"]),
  engineerDashboard
);

router.get(
  "/admin",
  auth,
  role(["ADMIN"]),
  adminDashboard
);

module.exports = router;
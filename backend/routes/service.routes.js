const express = require("express");
const router = express.Router();

const {
  createServiceRequest,
  getPending,
  accept,
  complete,
  myRequests
} = require("../controllers/service.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// USER creates service request
router.post(
  "/create",
  auth,
  role(["USER"]),
  createServiceRequest
);

// ENGINEER views pending requests
router.get(
  "/pending",
  auth,
  role(["ENGINEER"]),
  getPending
);

// ENGINEER accepts request
router.put(
  "/accept/:id",
  auth,
  role(["ENGINEER"]),
  accept
);

// ENGINEER completes request
router.put(
  "/complete/:id",
  auth,
  role(["ENGINEER"]),
  complete
);
router.get(
  "/my-requests",
  auth,
  role(["USER"]),
  myRequests
);


module.exports = router;
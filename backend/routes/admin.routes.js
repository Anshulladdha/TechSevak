const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  generateInvoice
} = require("../controllers/admin.controller");

const User = require("../models/user.model");

// view pending engineers
router.get(
  "/pending-engineers",
  auth,
  role(["ADMIN"]),
  async (req, res) => {
    const engineers = await User.find({
      role: "ENGINEER",
      isApproved: false
    });

    res.json(engineers);
  }
);

// approve engineer
router.put(
  "/approve/:id",
  auth,
  role(["ADMIN"]),
  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true
    });

    res.json({ message: "Engineer approved successfully" });
  }
);
router.put(
  "/generate-invoice/:serviceId",
  auth,
  role(["ADMIN"]),
  generateInvoice
);



module.exports = router;

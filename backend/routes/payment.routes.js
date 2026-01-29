const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  myInvoices ,  payInvoiceDummy
} = require("../controllers/payment.controller");

router.get(
  "/my-invoices",
  auth,
  role(["USER"]),
  myInvoices
);

// dummy payment
router.post(
    "/pay/:invoiceId",
    auth,
    role(["USER"]),
    payInvoiceDummy
  );

module.exports = router;
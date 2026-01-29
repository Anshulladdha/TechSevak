const Invoice = require("../models/invoice.model");
const ServiceRequest = require("../models/serviceRequest.model");
const User = require("../models/user.model");



const myInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user.id
    })
      .populate("serviceRequest", "problem location status")
      .populate("engineer", "name email");

    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const payInvoiceDummy = async (req, res) => {
    try {
      const { invoiceId } = req.params;
  
      const invoice = await Invoice.findById(invoiceId);
  
      if (!invoice)
        return res.status(404).json({ message: "Invoice not found" });
  
      if (invoice.status === "PAID")
        return res.status(400).json({ message: "Already paid" });
  
      // 1️⃣ mark invoice paid
      invoice.status = "PAID";
      await invoice.save();
  
      // 2️⃣ close service
      await ServiceRequest.findByIdAndUpdate(
        invoice.serviceRequest,
        { status: "CLOSED" }
      );
  
      // 3️⃣ credit engineer wallet
      await User.findByIdAndUpdate(invoice.engineer, {
        $inc: { wallet: invoice.totalAmount }
      });
  
      res.json({
        message: "Payment successful (Dummy)",
        status: "PAID"
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
  myInvoices , payInvoiceDummy
};
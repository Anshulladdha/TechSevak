const ServiceRequest = require("../models/serviceRequest.model");
const Invoice = require("../models/invoice.model");

const generateInvoice = async (req, res) => {
  try {
    const { extraCharge } = req.body;
    const { serviceId } = req.params;

    const service = await ServiceRequest.findById(serviceId);

    if (!service)
      return res.status(404).json({ message: "Service not found" });

    if (service.status !== "COMPLETED")
      return res
        .status(400)
        .json({ message: "Service not completed yet" });

    const baseCharge = 299;
    const totalAmount = baseCharge + Number(extraCharge || 0);

    const invoice = await Invoice.create({
      serviceRequest: service._id,
      user: service.user,
      engineer: service.engineer,
      baseCharge,
      extraCharge,
      totalAmount
    });

    res.json({
      message: "Invoice generated successfully",
      invoice
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  generateInvoice
};  
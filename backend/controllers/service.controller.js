const service = require("../services/service.service");
const ServiceRequest = require("../models/serviceRequest.model");
const createServiceRequest = async (req, res) => {
  try {
    const data = await service.createRequest(req.user.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPending = async (req, res) => {
  try {
    const data = await service.getPendingRequests();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const accept = async (req, res) => {
  try {
    const data = await service.acceptRequest(
      req.params.id,
      req.user.id
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const complete = async (req, res) => {
  try {
    const data = await service.completeRequest(
      req.params.id,
      req.user.id
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const myRequests = async (req, res) => {
  try {
  const services = await ServiceRequest.find({
  user: req.user.id
  })
  .populate("engineer", "name email city area")
  .sort({ createdAt: -1 });
  
  
  res.json(services);
  } catch (error) {
  res.status(500).json({ message: error.message });
  }
  };

module.exports = {
  createServiceRequest,
  getPending,
  accept,
  complete,
  myRequests
};

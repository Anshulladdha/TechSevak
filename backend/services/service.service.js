const ServiceRequest = require("../models/serviceRequest.model");

const createRequest = async (userId, data) => {
  return await ServiceRequest.create({
    user: userId,
    problem: data.problem,
    location: data.location
  });
};

const getPendingRequests = async () => {
  return await ServiceRequest.find({ status: "PENDING" })
    .populate("user", "name email");
    return requests;
};

const acceptRequest = async (requestId, engineerId) => {
  const request = await ServiceRequest.findById(requestId);

  if (!request) throw new Error("Request not found");

  if (request.status !== "PENDING") {
    throw new Error("Request already accepted");
  }

  request.engineer = engineerId;
  request.status = "ACCEPTED";

  await request.save();

  return request;
};

const completeRequest = async (requestId, engineerId) => {
  const request = await ServiceRequest.findById(requestId);

  if (!request) throw new Error("Request not found");

  if (request.engineer.toString() !== engineerId) {
    throw new Error("Not authorized");
  }

  request.status = "COMPLETED";
  await request.save();

  return request;
};

module.exports = {
  createRequest,
  getPendingRequests,
  acceptRequest,
  completeRequest
};

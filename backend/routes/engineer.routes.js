const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../config/multer");
const { updateProfile ,myJobs} = require("../controllers/engineer.controller");

router.put(
  "/update-profile",
  auth,
  role(["ENGINEER"]),
  updateProfile
);


router.get(
  "/my-jobs",
  auth,
  role(["ENGINEER"]),
  myJobs
  );


router.put(
    "/upload-id",
    auth,
    role(["ENGINEER"]),
    upload.single("idProof"),
    async (req, res) => {
      res.json({
        message: "ID uploaded successfully",
        file: req.file.filename
      });
    }
  );
module.exports = router;

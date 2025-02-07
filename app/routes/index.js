const express = require("express");
const router = express.Router();

// localhost:3000/api
// get method
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET to API",
    metaData: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// localhost:3000/api/anythingThatComesAfter
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "GET by ID for /api",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// post method
router.post("/", (req, res) => {
  const { data } = req.body;
  res.status(200).json({
    message: "POST to /api",
    data,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

module.exports = router;

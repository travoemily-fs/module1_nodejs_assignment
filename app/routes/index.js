const express = require("express");
const router = express.Router();
const todos = [
  { id: 1, task: "Learning DELETE method" },
  { id: 2, task: "Practice makes perfect!" },
];
const randomObj = {
  userID: 123,
  name: "Bruce",
  age: 36,
  alias: "Batman",
};

// GET METHOD
// localhost:3000/api
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET to API",
    metaData: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// GET by ID METHOD
// localhost:3000/api/:45
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "GET by ID from /api",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// DELETE by ID METHOD
// localhost:3000/api/1
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Params >>>", id);

  // find the index # of the item you're deleting...
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const deletedItem = todos.splice(index, 1)[0];
    res.status(200).json({
      message: "Item successfully deleted!",
      deletedItem,
    });
  } else {
    res.status(400).json({
      message: "The item you're attempting to delete was not found.",
    });
  }
});

/*
example post request for Postman:
{"data": "The data has been requested."}
*/

// POST METHOD w/ data
// localhost:3000/api
router.post("/", (req, res) => {
  console.log("Request body >>>", req.body);
  const { data } = req.body;
  res.status(200).json({
    message: "POST to /api",
    data,
    metadata: { hostname: req.hostname, method: req.method },
  });
});

/* process for getting PUT...
  part 1: extract get the id from req.params
  part 2: get the update from req.body
  part 3: find user aka randomObj object
  part 4: update whatever field of randomObj without replacing the entire object
  part 5: send the updated object as a response

  REMINDERS: use a loop to find the key-value pair you want to change

  TEST Postman PUT request (so you can just copy and paste it in):

  {
  "name": "Clark",
  "alias": "Superman"
  }

*/

// PUT by ID
// localhost:3000/api/:89
router.put("/:id", (req, res) => {
  console.log("Fetching original data >>>", randomObj);
  console.log("Computing request body >>>", req.body);
  const id = req.params.id;

  // begin the loop
  // use the hasOwnProperty method to check for that the property values we are going to change exist
  Object.keys(req.body).forEach((key) => {
    if (randomObj.hasOwnProperty(key)) {
      randomObj[key] = req.body[key];
    }
  });
  // now send back the updated object with json
  res.status(200).json({
    message: "The user has been updated successfully!",
    updatedUser: randomObj,
  });
});

module.exports = router;

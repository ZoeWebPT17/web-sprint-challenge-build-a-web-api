const express = require("express");
const router = express.Router();
const database = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  database
    .get()
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

router.get("/:id", ValidateID, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAtion, ValidateID, (req, res) => {
  database
    .insert(req.body)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

router.put("/:id", ValidateID, (req, res) => {
  database
    .update(req.params.id, req.body)
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

router.delete("/:id", ValidateID, (req, res) => {
  database
    .remove(req.params.id)
    .then((result) =>
      result === 1
        ? res.status(204).send()
        : res.status(500).json({ error: "This action could not be deleted!" })
    )
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

//Custom Middleware uwu
function ValidateID(req, res, next) {
  database
    .get(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .json({ error: "This Action ID is invalid! Try another!" });
      } else {
        req.action = result;
        next();
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
}

function validateAtion(req, res, next) {
  if (!req.body.project_id) {
    res.status(400).json({ error: "Please provide a valid ID!" });
  } else {
    next();
  }
}

module.exports = router;

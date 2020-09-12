const express = require("express");
const router = express.Router();
const database = require("../data/helpers/projectModel");
const actionDatabase = require("../data/helpers/actionModel");

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
  res.status(200).json(req.project);
});

router.get("/:id/actions", ValidateID, (req, res) => {
  database
    .getProjectActions(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

router.post("/", (req, res) => {
  database
    .insert(req.body)
    .then((result) => res.status(201).send())
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
        : res
            .status(500)
            .json({ error: "There was an error connecting to the database!" })
    )
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
});

//Custom Middleware :D

function ValidateID(req, res, next) {
  database
    .get(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .json({ error: "This project ID is invalid! Try another!" });
      } else {
        req.project = result;
        next();
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error connecting to the database!" });
    });
}

module.exports = router;

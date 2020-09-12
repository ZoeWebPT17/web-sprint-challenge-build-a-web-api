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
        .json({ error: "There was an error connecting to the database" });
    });
});

router.get("/:id" (req,res) => {

})

router.get("/:id/actions" (req,res) => {
    
})

router.post("/" (req,res) => {
    
})

router.put("/:id" (req,res) => {
    
})

router.delete("/:id" (req,res) => {
    
})
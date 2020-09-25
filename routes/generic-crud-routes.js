const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res, next) => {});

// Get one
router.get("/page/:id", (req, res, next) => {});

// Display the form to create
router.get("/create", (req, res, next) => {});

// Get the data back from the form
router.post("/create", (req, res, next) => {});

// Display the edit form
router.get("/create/:id/edit", (req, res, next) => {});

// Get the data back from the form
router.post("/create/:id/edit", (req, res, next) => {});

// Delete
router.get("/:id/delete", (req, res, next) => {});

module.exports = router;

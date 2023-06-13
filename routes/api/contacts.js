const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template message2222" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message2222222" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message3333333" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message4444444" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

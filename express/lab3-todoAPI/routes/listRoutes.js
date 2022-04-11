const { Router } = require("express");
const List = require("../models/List");

const router = Router();

//List
router.get("/", async (req, res) => {
  const lists = await List.find().populate("items");
  res.send(lists);
});

//Create
router.post("/", async (req, res) => {
  const list = new List(req.body);
  await list.save()
  res.send(list)
});

//Retrieve
router.get("/:id", async (req, res) => {
  const list = await List.findOne({ _id: req.params.id });
  if (!list) {
    res.send(404);
  } else {
    res.send(list);
  }
});

//Update
router.patch("/:id", async (req, res) => {
  const list = await List.findOne({ _id: req.params.id })
  if (!list) {
    res.send(404)
  }

  const listData = req.body
  list.set(listData)
  await list.save()
  res.send(list)
});

//Delete
router.delete("/:id", async (req, res) => {
  const list = await List.findOne({ _id: req.params.id });
  if (!list) {
    res.send(404);
  } else {
    await list.remove();
    res.send(list);
  }
});

module.exports = router;

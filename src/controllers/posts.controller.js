const express = require("express");
const router = express.Router();
const Post = require("../models/posts.model");
const  authenticate =require("../middleware/auch.middleware")
router.get("/", async (req, res) => {
  try {
    const post = await Post.find().populate({
      path: "user",
      select: { name: 1,_id: 0 },
    }).lean().exec();
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/",authenticate ,async (req, res) => {
  try {
     req.body.user = req.user; 
    const post = await Post.create(req.body)
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.patch("/:id",authenticate ,async (req, res) => {
  try {
     req.body.user = req.user; 
    const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.delete("/:id", authenticate, async (req, res) => {
  try {
    req.body.user = req.user;
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports= router
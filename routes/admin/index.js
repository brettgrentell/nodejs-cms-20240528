const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

const { faker } = require("@faker-js/faker");
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.post("/generate-fake-posts", (req, res) => {
  for (let i = 0; i < req.body.amount; i++) {
    let post = new Post();

    post.title = faker.word.words({ count: { min: 3, max: 7 } });
    post.status = "public";
    post.allowComments = faker.datatype.boolean();
    post.body = faker.lorem.sentence();

    post.save().then(result => {
      
    });
  }

  res.redirect('/admin/posts');
});

module.exports = router;

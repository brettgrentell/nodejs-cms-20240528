const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

const { faker } = require("@faker-js/faker");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  Category.find({}).then((categories) => {
    res.render("admin/categories", { categories });
  });
});

router.post("/create", (req, res) => {
  const newCategory = Category({
    name: req.body.name,
  });

  newCategory.save().then((savedCategory) => {
    return res.redirect("/admin/categories");
  });
});

router.get("/edit/:id", (req, res) => {
  Category.findOne({ _id: req.params.id }).then((category) => {
    res.render("admin/categories/edit", { category });
  });
});

router.put("/edit/:id", (req, res) => {
  Category.findOne({ _id: req.params.id }).then((category) => {
    category.name = req.body.name;

    category.save().then((result) => {
      res.redirect("/admin/categories");
    });
  });
});

router.delete('/:id', (req, res) => {
  Category.deleteOne({_id: req.params.id}).then(result => {
     res.redirect('/admin/categories');
  })
});

module.exports = router;

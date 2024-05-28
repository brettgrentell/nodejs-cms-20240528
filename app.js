const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars").engine;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const upload = require("express-fileupload");
var session = require("express-session");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {mongoDbUrl} = require("./config/database");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");

mongoose
  .connect(mongoDbUrl)
  .then((db) => {
    console.log("MONGO connected");
  })
  .catch((error) => console.log(error));

app.use(
  session({
    secret: "someonewho123ilovecoding",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const { select, generateDate } = require("./helpers/handlebars-helpers");

app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "home",
    helpers: { select: select, generateDate: generateDate },
  })
);
app.set("view engine", "handlebars");

// Upload Middleware

app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Method Override

app.use(methodOverride("_method"));

// Local variables using middleware
app.use((req, res, next) => {
  res.locals.user = req.user || null;

  res.locals.success_message = req.flash("success_message");

  res.locals.error_message = req.flash("error_message");

  res.locals.form_errors = req.flash("form_errors");

  res.locals.error = req.flash('error');

  next();
});

// Load Routes

const home = require("./routes/home");
const admin = require("./routes/admin");
const posts = require("./routes/admin/posts");
const categories = require("./routes/admin/categories");

app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);
app.use("/admin/categories", categories);

app.listen(4500, () => {
  console.log(`listening on port 4500`);
});

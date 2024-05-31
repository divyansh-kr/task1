const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // res.render("signup");
      res.send("Already exist.............");
    } else {
      const data = {
        name,
        email,
        password,
      };

      await collection.insertMany([data]);
      res.render("home");
    }
  } catch (error) {
    res.send("<h1>Error during registeration process</h1>");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });

    if (check && check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("<h1>Wrong password or  Wrong email...........</h1>");
    }
  } catch {
    res.send("<h1>Your details are wrong..........</h1>");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});

//This is my task6

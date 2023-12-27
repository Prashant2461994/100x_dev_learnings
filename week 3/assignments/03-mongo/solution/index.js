const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.3jjqgwy.mongodb.net/")
  .then(() => {
    console.log("connected successfully");
  });

const Schema = mongoose.Schema;
// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const Course = mongoose.model("Course", CourseSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.model("User", UserSchema);

//Middleware for checking if user exists or not
async function isUserAlreadyExists(req, res, next) {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  next();
}

// Middleware for parsing request bodies
app.use(bodyParser.json());

// Admin Routes
app.post("/admin/signup", (req, res) => {
  Admin.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({
    message: "Admin created successfully",
  });
});

app.post("/admin/courses", (req, res) => {
  Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  res.json({
    message: "Course created successfully",
  });
});

app.get("/admin/courses", (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

// User Routes
app.post("/users/signup", isUserAlreadyExists, (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({
    message: "User created successfully",
  });
});

app.get("/users/courses", (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

app.post("/users/courses/:courseId", (req, res) => {});

app.post("/users/courses/", (req, res) => {
  const course = req.body;
  Course.create(course);
  res.status(201).json("Couse saved successfully");
});

app.post("/users/purchaseCourse", async (req, res) => {
  const username = req.body.username;
  const course_id = req.body.course_id;
  const updatedUser = await User.updateOne(
    { username },
    { $addToSet: { purchasedCourses: course_id } },
    { new: true }
  );

  res.send(201).json({ message: `Successfully purchased course ${username}` });
});

app.get("/users/purchasedCourses", async (req, res) => {
  try {
    const usersWithPurchasedCourses = await User.find({
      purchasedCourses: { $exists: true, $not: { $size: 0 } },
    });

    const purchasedCourseIds = usersWithPurchasedCourses.reduce(
      (courseIds, user) => courseIds.concat(user.purchasedCourses),
      []
    );

    const purchasedCourses = await Course.find({
      _id: { $in: purchasedCourseIds },
    });

    res.json({ purchasedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

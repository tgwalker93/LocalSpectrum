const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const profileRoutes = require("./profile");

// Book routes
router.use("/books", bookRoutes);

// User routes
router.use("/users", userRoutes);

// User routes
router.use("/profile", profileRoutes);

module.exports = router;

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config({ path: ".env" });
require("./config/passport");

const app = express();

// Importación de rutas

// const crudRoutes = require("./routes/crudRoutes.js");
// const appRoutes = require("./routes/appRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const likeRoutes = require("./routes/likeRoutes.js");
const cascadeFilterRoutes = require("./routes/cascadeFilterRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const contributionRoutes = require("./routes/contributionRoutes.js");
const savedContributionRoutes = require("./routes/savedContributionRoutes.js");
const downloadContributionRoutes = require("./routes/downloadContributionRoutes.js");

// const reportRoutes = require("./routes/reportRoutes.js");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rutas API
// app.use("/api/app", appRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/filter", cascadeFilterRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/notification", notificationRoutes);

// app.use("/api/crud", crudRoutes);
app.use("/api/contribution", contributionRoutes);
app.use("/api/savedContribution", savedContributionRoutes);
app.use("/api/downloadContribution", downloadContributionRoutes);

// app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;

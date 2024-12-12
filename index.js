const express = require("express");
const cors = require("cors");
const path = require("path");
const groupsRoutes = require("./routes/groups-routes");
const linksRoutes = require("./routes/links-routes");
const albumsRoutes = require("./routes/albums-routes");
const eventsRoutes = require("./routes/events-routes");
const adminRoutes = require("./routes/admin-routes");
const sslRedirect = require('heroku-ssl-redirect').default;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Middleware to link API to frontend
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
// Middleware to enable SSL redirect
app.use(sslRedirect());

app.use("/api/admin", adminRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/links", linksRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/events", eventsRoutes);

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`server is now listening at ${PORT} go to http://localhost:${PORT}/`);
});

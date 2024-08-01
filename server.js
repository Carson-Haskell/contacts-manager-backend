const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

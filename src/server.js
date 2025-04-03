require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import Swagger setup
const setupSwagger = require('./swagger');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Set up Swagger UI
setupSwagger(app);

// Sample route to check if the server is working
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Event Locator API!" });
});

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Event Routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/events', eventRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

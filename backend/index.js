import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import pollRoute from "./routes/poll.route.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use(pollRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

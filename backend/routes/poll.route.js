import { Router } from "express";
import pollControllers from "../controllers/poll.controller.js";

const pollRoute = Router();

pollRoute.get("/api/poll", pollControllers.getPoll);

pollRoute.post("/api/poll", pollControllers.createPoll);

pollRoute.post("/api/vote", pollControllers.votePoll);

export default pollRoute;

import { Router } from "../../deps.js";
import * as apiController from "../controllers/apiController.js"

const api = new Router();

api.get("/api/questions/random", apiController.getRandomQuestion);
api.post("/api/questions/answer", apiController.handleAnswer);

export { api };
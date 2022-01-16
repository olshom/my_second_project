import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.post("/questions", questionController.addQuestion);
router.get("/questions", questionController.listQuestions);
router.get("/questions/:id", questionController.showTheQuestion);
router.post("/questions/:id/options", answerController.addAnswer);
router.post("/questions/:questionId/options/:optionId/delete", answerController.deleteAnswer)
router.post("/questions/:id/delete", questionController.deleteQuestion);

router.post("/auth/register", registrationController.registerUser);
router.get("/auth/register", registrationController.showRegistration);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.chooseRandomQuestion);
router.get("/quiz/:id", quizController.showRandomQuestion);
router.get("/quiz/:id/correct", quizController.showResultIsCorrect);
router.get("/quiz/:id/incorrect", quizController.showResultIsIncorrect);
router.post("/quiz/:id/options/:optionId", quizController.postAnswerOnQuestion);

router.get("/statistics", statisticsController.showStats)


export { router };

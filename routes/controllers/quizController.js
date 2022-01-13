import { renderFile } from "../../deps.js";
import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const chooseRandomQuestion = async({response}) => {
    const allQuestionsId = await quizService.getAllQuestionId();
    const random = allQuestionsId[Math.floor(Math.random()*allQuestionsId.length)];
    response.redirect(`/quiz/${random.id}`)
};

const showRandomQuestion = async({params, render, user}) => {

    render("quiz.eta", { question: await questionService.showTheQuestion(params.id),
        answers:  await answerService.listAnswers(params.id), user})
};

const postAnswerOnQuestion = async({request, response, params, user, render}) => {
    const isCorrect = await quizService.isAnswerCorrect(params.optionId)

    await quizService.saveAnswerOnQuestion(user.id, params.id, params.optionId, isCorrect.is_correct);

    if (isCorrect.is_correct) {
        render("correctAnswer.eta", { user })
    } else {
        render("incorrectAnswer.eta", { option: await quizService.findCorrectAnswer(params.id), user })
    }
}
export { chooseRandomQuestion, showRandomQuestion, postAnswerOnQuestion }
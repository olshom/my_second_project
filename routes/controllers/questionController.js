import { renderFile } from "../../deps.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestion = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        title: params.get("title"),
        question_text: params.get("question_text"),
    }
}

const addQuestion = async ({ request, response, user, render }) => {
    const question = await getQuestion(request);

    const [passes, errors] = await validasaur.validate(question, questionValidationRules,);
    if (!passes) {
        question.validationErrors = errors;
        render("questions.eta", { question, user })
    } else {
        await questionService.addQuestion(user.id, question.title, question.question_text);
        response.redirect("/questions");
    }
};

const listQuestions = async ({ render, user }) => {
    render("questions.eta", { questions: await questionService.listQuestions(user.id), user });
}

const showTheQuestion = async({ response, params, render, user }) => {
    const question = await questionService.showTheQuestion(params.id);

    if (user.id !== question.user_id) {
        response.redirect("/questions")
    }

    render("question.eta", { question, answers: await answerService.listAnswers(params.id), user })
}

const deleteQuestion = async({ params, response }) => {
    await questionService.deleteQuestion(params.id);
    response.redirect("/questions");
}
export { addQuestion, listQuestions, showTheQuestion, deleteQuestion };
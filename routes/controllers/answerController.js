import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const answerValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)]
};

const getAnswerData = async(request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    return {
        option_text: params.get("option_text"),
        is_correct: params.get("is_correct") ? true : false
    }
}

const addAnswer = async ({ request, response, params, render, user }) => {
    const answerData = await getAnswerData(request);
    const question = await questionService.showTheQuestion(params.id);

    if (user.id === question.user_id) { 
        const [passes, errors] = await validasaur.validate(answerData, answerValidationRules);

        if (!passes) {
            console.log(errors);
            answerData.validationErrors = errors;
            render ("question.eta", { question: await questionService.showTheQuestion(params.id),
                answers: answerData, user})
        } else {
            await answerService.addAnswer(params.id, answerData.option_text, answerData.is_correct)
            response.redirect(`/questions/${params.id}`);
        }
    } else {
        response.status = 403;

    }

};

const deleteAnswer = async ({ params, response, user }) => {
    const question = await questionService.showTheQuestion(params.questionId);

    if (user.id === question.user_id) {
        await answerService.deleteAnswer(params.optionId);
        response.redirect(`/questions/${params.questionId}`);
    } else {
        response.status = 403;

    }
}
export { addAnswer, deleteAnswer }
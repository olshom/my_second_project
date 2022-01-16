import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getRandomQuestion = async ({ response }) => {
    const allQuestionsId = await quizService.getAllQuestionId();

    if (allQuestionsId.length === 0) {
        response.body = {};
    } else {
    const random = allQuestionsId[Math.floor(Math.random()*allQuestionsId.length)];

    const question = await questionService.showTheQuestion(random.id);

    if (question) {
        const answers = await answerService.listAnswers(random.id); 

        const answerOptions = answers.map(answer => {
            return {
                optionId: answer.id,
                optionText: answer.option_text
            }
        });

        response.body = {
            questionId: random.id,
            questionTitle: question.title,
            questionText: question.question_text,
            answerOptions
        };
    }
}
};

const handleAnswer = async({ request, response }) => {

    const body = request.body({ type: "json" });
    const document = await body.value;

    const isCorrect = await quizService.isAnswerCorrect(document.optionId)
    if (!isCorrect) {
        response.body = {};
    } else {
        response.body = { correct: isCorrect.is_correct };
    }
};

export { getRandomQuestion, handleAnswer }
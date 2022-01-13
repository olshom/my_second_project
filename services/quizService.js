import { executeQuery } from "../database/database.js";

const getAllQuestionId = async () => {
    const result = await executeQuery(`SELECT id FROM questions`)
    return result.rows;
};

const saveAnswerOnQuestion = async (userId, questionId, answerOptionId, isCorrect) => {
    await executeQuery(`INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct)
    VALUES($1, $2, $3, $4)`,
    userId,
    questionId,
    answerOptionId,
    isCorrect,
    )
}

const isAnswerCorrect = async (optionId) => {
    const res = await executeQuery(`SELECT is_correct FROM question_answer_options WHERE id = $1`, optionId);
    return res.rows[0]
};
const findCorrectAnswer = async (questionId) => {
    const res = await executeQuery(`SELECT option_text FROM question_answer_options WHERE question_id = $1 and is_correct = 'true'`, 
    questionId,
    );
    return res.rows[0]
}
export { getAllQuestionId, saveAnswerOnQuestion, isAnswerCorrect, findCorrectAnswer }
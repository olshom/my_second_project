import { executeQuery } from "../database/database.js";

const addAnswer = async (question_id, option_text, is_correct) => {
    await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct)
    VALUES ($1, $2, $3)`,
    question_id, option_text, is_correct,
    )
};

const listAnswers = async(questionId) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options
    WHERE question_id = $1`,
    questionId   
    )
    return res.rows
}

const checkOptionAnswerIsUsed = async(optionId) => {
    const res = await executeQuery(`SELECT * FROM question_answers WHERE question_answer_option_id = $1`,
    optionId);
    return res.rows
}

const deleteAnswer = async(id) => {
    const answerIsUsed = await checkOptionAnswerIsUsed(id);
    if ( answerIsUsed.length > 0 ) {
        await executeQuery (`DELETE from question_answers
        WHERE question_answer_option_id = $1`, id)
    }

    await executeQuery(
        `DELETE from question_answer_options
        WHERE id = $1`,
        id
    )
}

export { addAnswer, listAnswers, deleteAnswer }
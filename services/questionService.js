import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, question_text) => {
    await executeQuery(
        `INSERT INTO questions (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
        userId, title, question_text,);
};

const listQuestions = async (userId) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE user_id = $1`, userId);
    return res.rows;  
};

const showTheQuestion = async (id) => {
    const res = await executeQuery(`SELECT * FROM questions
    WHERE id = $1`,
    id);
    return res.rows[0];
};

const deleteQuestion = async(id) => {
    await executeQuery(
        `DELETE from questions
        WHERE id = $1`,
        id
    )
}

export { addQuestion, listQuestions, showTheQuestion, deleteQuestion };
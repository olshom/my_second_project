import { executeQuery } from "../database/database.js";

const totalAnswers = async(userId) => {
    const res = await executeQuery(`SELECT COUNT(*) FROM question_answers WHERE user_id = $1`,
    userId,
    );
    return res.rows[0];
};

const quantityCorrectAnswers = async(userId) => {
    const res = await executeQuery(`SELECT COUNT(*) FROM question_answers WHERE user_id = $1 and correct = 'true'`,
    userId,
    );
    return res.rows[0];
};

const answersOnOwnQuestions = async(userId) => {
    const res = await executeQuery(`select count(*) from questions 
    JOIN question_answers ON questions.id=question_answers.question_id 
    WHERE questions.user_id = $1 AND question_answers.user_id = $1`,
    userId,
    );
    return res.rows[0];
};

const topFive = async() => {
    const res = await executeQuery(`SELECT users.email as email, count(*) as count 
    FROM users
    JOIN question_answers ON users.id = question_answers.user_id
    GROUP BY users.email 
    ORDER BY count DESC
    LIMIT 5;`);
    return res.rows;
}
export { totalAnswers, quantityCorrectAnswers, answersOnOwnQuestions, topFive }
import { executeQuery } from "../../database/database.js";

const clearDatabase = async () => {
    await executeQuery("DROP TABLE question_answers; DROP TABLE question_answer_options; DROP TABLE questions; DROP TABLE users");
}

const createDatabase = async () => {
    await executeQuery(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password CHAR(60)
      );
      
      CREATE TABLE questions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(256) NOT NULL,
        question_text TEXT NOT NULL
      );
      
      CREATE TABLE question_answer_options (
        id SERIAL PRIMARY KEY,
        question_id INTEGER REFERENCES questions(id),
        option_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT false
      );
      
      CREATE TABLE question_answers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        question_id INTEGER REFERENCES questions(id),
        question_answer_option_id INTEGER REFERENCES question_answer_options(id),
        correct BOOLEAN DEFAULT false
      );
      
      CREATE UNIQUE INDEX ON users((lower(email)));
      `)
}

export { clearDatabase, createDatabase }
# Documentation

## Description

The application is a quiz game, where the user can answer multiple choice questions, or create questions for others to answer. The application also has an open API.

## How to use

1. Install Deno https://deno.land/manual/getting_started/installation

2. Create a PostgreSQL database with the following tables:

```
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
```

3. Run locally from the application root:

```deno run --allow-net --allow-read --allow-env --unstable run-locally.js```

4. Open http://localhost:7777 in brower of your choice

## Testing

1. Set the database credentials in the database/database.js file as show in the example below

```
const CONCURRENT_CONNECTIONS = 2;
let connectionPool;
if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool(Deno.env.get("DATABASE_URL"), CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({
    hostname: "hostname",
  database: "databasename",
  user: "userhere",
  password: "yourpasswordhere",
  port: 5432,
  }, CONCURRENT_CONNECTIONS);
}
```

2. Run locally from the application root:

```deno test --allow-read --allow-net --allow-env --unstable```

## API

get: /api/questions/random - returns random question from the database

post: /api/questions/answer - returns whether the answer for the question sent with post request is correct

example of request:

```
{
  "questionId": 1,
  "optionId": 3,
}
```

## Link to the application

https://my-second-project-quiz.herokuapp.com/
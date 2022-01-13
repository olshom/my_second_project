# Documentation

## Description

The application is a quiz game, where the user can answer multiple choice questions, or create questions for others to answer. The application also has an open API.

## How to use

1. Create sql database with tables:

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

2. Run locally:

```deno run --allow-net --allow-read --unstable run-locally.js```

## Testing

Run:

```

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

##
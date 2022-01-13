You could add api-related endpoints here.

get: /api/questions/random - returns random question from the database

post: /api/questions/answer - returns whether the answer for the question sent with post request is correct

example of request:

{
  "questionId": 1,
  "optionId": 3,
}
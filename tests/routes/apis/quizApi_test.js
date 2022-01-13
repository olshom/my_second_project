import { superoak } from "../../../deps.js";
import { app } from "../../../app.js";
import { clearDatabase, createDatabase } from "../../helpers/databaseHelpers.js"
import { addUser } from '../../../services/userService.js';
import { addQuestion } from "../../../services/questionService.js";
import { addAnswer } from "../../../services/answerService.js";

Deno.test({
    name: "Get request to /api/questions/random should return status 200",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        await addUser("user@email.com", "password")
        await addQuestion(1, "title1", "question1");
        await addQuestion(1, "title2", "question2");
        const testClient = await superoak(app);
    const response = await testClient.get("/api/questions/random")
    .expect("Content-Type", new RegExp("application/json"))
    .expect(200)

    await clearDatabase();

    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test({
    name: "Post request to /api/questions/answer should return correct result",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        await addUser("user@email.com", "password");
        await addQuestion(1, "title1", "question1");
        await addAnswer(1,"answer1", true);
        const testClient = await superoak(app);
    const response = await testClient.post("/api/questions/answer")
    .send({
        "questionId": 1,
        "optionId": 1,
      })
    .expect(200)
    .expect("Content-Type", new RegExp("application/json"))
    .expect({ correct: true })

    await clearDatabase();

    },
    sanitizeResources: false,
    sanitizeOps: false
})
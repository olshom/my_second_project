import { addAnswer, listAnswers, deleteAnswer } from '../../services/answerService.js'
import { assertEquals, assertNotEquals } from "../../deps.js";
import { clearDatabase, createDatabase } from "../helpers/databaseHelpers.js"
import { addUser } from '../../services/userService.js';
import { addQuestion } from "../../services/questionService.js";


Deno.test({
    name: "Should return correct amount of answers",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        await addUser("user@email.com", "password");
        await addQuestion(1, "title1", "question1");
        await addAnswer(1,"answer1", true);
        await addAnswer(1,"answer1", false);
        const answer = await listAnswers(1);
    
        assertEquals(2, answer.length)

        await clearDatabase();
    },
    sanitizeResources: false,
    sanitizeOps: false
  });
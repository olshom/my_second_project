import { getAllQuestionId } from '../../services/quizService.js'
import { addQuestion, showTheQuestion, deleteQuestion } from '../../services/questionService.js'
import { assertEquals } from "../../deps.js";
import { clearDatabase, createDatabase } from "../helpers/databaseHelpers.js"
import { addUser } from '../../services/userService.js';


Deno.test({
    name: "Should count quantity of questions",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        await addUser("user@email.com", "password")
        await addQuestion(1, "title1", "question1");
        await addQuestion(1, "title2", "question2");
        const result = await getAllQuestionId();
        assertEquals(2, result.length)

        await clearDatabase();
    },
    sanitizeResources: false,
    sanitizeOps: false
  });

Deno.test({
    name: "Should return correct question",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        await addUser("user@email.com", "password")
        await addQuestion(1, "title1", "question1");
        await addQuestion(1, "title2", "question2");
        const question = await showTheQuestion(1);
    
        assertEquals(question, { id: 1, user_id: 1, title: "title1", question_text: "question1"})

        await clearDatabase();
    },
    sanitizeResources: false,
    sanitizeOps: false
  });

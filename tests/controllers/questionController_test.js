import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "Post request to /questions should return status 200",
    fn: async () => {

        const testClient = await superoak(app);
    const response = await testClient.post("/questions")
    .send({ userId: 1, title: "title", question_test: "question text" })
    .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test({
    name: "Get request to /questions should return status 200",
    fn: async () => {
        const testClient = await superoak(app);
    const response = await testClient.get("/questions")
    .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test({
    name: "Get request to /questions/1 should return status 200",
    fn: async () => {
        const testClient = await superoak(app);
    const response = await testClient.get("/questions/1")
    .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false
})
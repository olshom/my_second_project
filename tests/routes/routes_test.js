import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "Redirects when unauthorized 1",
    fn: async () => {
        const testClient = await superoak(app);
    const response = await testClient.get("/questions")
    .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false
})

Deno.test({
    name: "Redirects when unauthorized 2",
    fn: async () => {
        const testClient = await superoak(app);
    const response = await testClient.get("/quiz")
    .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false
})

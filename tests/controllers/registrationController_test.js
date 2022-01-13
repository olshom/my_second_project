import { superoak } from "../../deps.js";
import { app } from "../../app.js";
import { clearDatabase, createDatabase } from "../helpers/databaseHelpers.js"



Deno.test({
    name: "Should return correct question",
    fn: async () => {
        await clearDatabase();
        await createDatabase();
        const testClient = await superoak(app);
        const response = await testClient.post("/auth/register")
        .send("email=test@test.com&password=password")
        .expect(302)

        await clearDatabase();
    },
    sanitizeResources: false,
    sanitizeOps: false
  });

  
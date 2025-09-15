import express from "express"
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.use(express.json());

// password logic- we can secure this endpoint only allowed can hit out hook
app.post("/hooks/catch/:userId/:triggerId", async (req, res) => {
    const userId = req.params.userId;
    const triggerId = req.params.triggerId;
    const body = req.body;
    console.log("USER ID ",userId)
    console.log("TRIGGERID ",triggerId)
    // In this we need to verify that the user is the owner of the trigger

    // store in db a new trigger
    await client.$transaction(async tx => {
        const run = await tx.running.create({
            data: {
                zapId: triggerId,
                metadata: body
            }
        });

        await tx.runningOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(3000);
import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
    const triggers = await prismaClient.availableTrigger.findMany();
    return res.json({
        triggers
    })
})


export const triggerRouter = router;
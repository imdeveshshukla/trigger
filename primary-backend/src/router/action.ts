import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
    const actions = await prismaClient.availableAction.findMany();
    return res.json({
        actions
    })
})

export const actionRouter = router;
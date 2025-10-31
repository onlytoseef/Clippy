import express from "express";

import {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan,
} from "../controllers/plan";

const router = express.Router();

router.post("/create", createPlan);
router.get("/all", getPlans);
router.put("/update/:id", updatePlan);
router.delete("/delete/:id", deletePlan);

export default router;

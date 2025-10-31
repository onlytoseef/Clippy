import express from "express";
import pool from "../config/db";

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { user_id, plan, price, end_date } = req.body;

        if (!user_id || !plan || !end_date) {
            return res.status(400).json({ message: "user_id, plan, and end_date are required" });
        }

        const query = `
      INSERT INTO subscriptions (
        user_id, plan, price, end_date, script_characters, voice_credits, image_credits
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

        type PlanType = 'student' | 'beginner' | 'creator' | 'writer' | 'business';

        const defaultCredits: Record<PlanType, number[]> = {
            student: [10000, 5000, 20],
            beginner: [150000, 100000, 350],
            creator: [400000, 500000, 1000],
            writer: [1500000, 1000000, 2200],
            business: [5500000, 6500000, 10000],
        };

        // safely narrow plan type
        const planKey = (plan as PlanType) in defaultCredits ? (plan as PlanType) : 'student';
        const limits = defaultCredits[planKey];


        const result = await pool.query(query, [
            user_id,
            plan,
            price || 0.0,
            end_date,
            limits[0],
            limits[1],
            limits[2],
        ]);

        res.status(201).json({
            message: "✅ Subscription created successfully",
            subscription: result.rows[0],
        });
    } catch (err: any) {
        console.error("Error creating subscription:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// 🧾 2. Fetch all subscriptions
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT s.*, u.email, u.name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC;
    `);
        res.json(result.rows);
    } catch (err: any) {
        console.error("Error fetching subscriptions:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;

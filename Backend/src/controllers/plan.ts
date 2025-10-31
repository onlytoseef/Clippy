import { Request, Response } from "express";
import pool from "../config/db";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// ---------- CREATE PLAN ----------
export const createPlan = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body)
    const {
        name,
        price,
        script_credits,
        voice_credits,
        image_credits,
        video_credits,
        script_description,
        voice_description,
        image_description,
        video_description,
        popular,
    } = req.body;

    if (!name) {
        throw new ApiError(400, "Missing Name");
    }

    // ✅ Check if another popular plan already exists
    if (popular === true) {
        const popularExists = await pool.query("SELECT id FROM plans WHERE popular = TRUE");
        if ((popularExists.rowCount ?? 0) > 0) {
            throw new ApiError(400, "Only one plan can be popular");
        }
    }

    const result = await pool.query(
        `
      INSERT INTO plans (
        name, price,
        script_credits, voice_credits, image_credits, video_credits,
        script_description, voice_description, image_description, video_description,
        popular
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `,
        [
            name,
            price,
            script_credits,
            voice_credits,
            image_credits,
            video_credits,
            script_description || null,
            voice_description || null,
            image_description || null,
            video_description || null,
            popular || false,
        ]
    );

    res
        .status(201)
        .json(new ApiResponse(true, "Plan created successfully", result.rows[0]));
});

// ---------- GET ALL PLANS ----------
export const getPlans = asyncHandler(async (req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM plans ORDER BY id ASC");

    res
        .status(200)
        .json(
            new ApiResponse(true, "Plans fetched successfully", {
                total: result.rowCount,
                plans: result.rows,
            })
        );
});

// ---------- UPDATE PLAN ----------
export const updatePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        name,
        price,
        script_credits,
        voice_credits,
        image_credits,
        video_credits,
        script_description,
        voice_description,
        image_description,
        video_description,
        popular,
    } = req.body;

    // ✅ If trying to set this plan as popular, check for existing one
    if (popular === true) {
        const existingPopular = await pool.query(
            "SELECT id FROM plans WHERE popular = TRUE AND id <> $1",
            [id]
        );
        if ((existingPopular.rowCount ?? 0) > 0) {
            throw new ApiError(400, "Only one plan can be popular");
        }
    }

    const result = await pool.query(
        `
    UPDATE plans
    SET
      name = COALESCE($1, name),
      price = COALESCE($2, price),
      script_credits = COALESCE($3, script_credits),
      voice_credits = COALESCE($4, voice_credits),
      image_credits = COALESCE($5, image_credits),
      video_credits = COALESCE($6, video_credits),
      script_description = COALESCE($7, script_description),
      voice_description = COALESCE($8, voice_description),
      image_description = COALESCE($9, image_description),
      video_description = COALESCE($10, video_description),
      popular = COALESCE($11, popular),
      updated_at = NOW()
    WHERE id = $12
    RETURNING *;
    `,
        [
            name,
            price,
            script_credits,
            voice_credits,
            image_credits,
            video_credits,
            script_description,
            voice_description,
            image_description,
            video_description,
            popular,
            id,
        ]
    );

    if (result.rowCount === 0) {
        throw new ApiError(404, "Plan not found");
    }

    res
        .status(200)
        .json(new ApiResponse(true, "Plan updated successfully", result.rows[0]));
});

// ---------- DELETE PLAN ----------
export const deletePlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM plans WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        throw new ApiError(404, "Plan not found");
    }

    res
        .status(200)
        .json(new ApiResponse(true, "Plan deleted successfully", result.rows[0]));
});

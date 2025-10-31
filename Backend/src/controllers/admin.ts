import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import pool from "../config/db";
import { ApiResponse } from "../utils/ApiResponse";

export const allUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await pool.query("SELECT * FROM users WHERE user_type='user'");
    return res
    .status(200)
    .json(
        new ApiResponse(true, "All users", users.rows)
    )
});

export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const user = await pool.query("UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [status, id]);
    
    return res
    .status(200)
    .json(
        new ApiResponse(true, "User status updated", user.rows)
    )
});


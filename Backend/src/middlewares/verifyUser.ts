import jwt from "jsonwebtoken";
import pool from "../config/db";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyUser = () => {
    return asyncHandler(async (req: any, res: any, next: any) => {
        const token = req.cookies?.auth_token_x;

        if (!token) {
            throw new ApiError(400, "Please login first");
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as { id: string };

            const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.id]);

            if (userResult.rows.length === 0) {
                throw new ApiError(401, "Invalid or expired token");
            }

            req.user = userResult.rows[0];
            
            next();
        } catch (err: any) {
            throw new ApiError(401, "Invalid or expired token");
        }
    });
};

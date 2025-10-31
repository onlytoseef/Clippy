import { RequestHandler } from "express";
import { AuthRequest } from "../types/auth";
import { ApiError } from "../utils/ApiError";

export const checkRole = (...roles: ('admin' | 'user')[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as AuthRequest).user;

    if (!user || !user.user_type || !roles.includes(user.user_type)) {
      return next(new ApiError(403, `Access denied: Please login as ${roles.join(" or ")}`));
    }

    next();
  };
};

import rateLimit from "express-rate-limit";

export const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many verification attempts, please try again after 15 minutes.",
  },
});

export const resendCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many resend requests, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

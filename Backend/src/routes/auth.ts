import { Router } from "express"
import { forgotPassword, getCurrentUser, login, loginAdmin, logout, register, registerAdmin, resendVerification, resetPassword, updateUser, verifyEmail } from "../controllers/auth";
import { resendCodeLimiter, verifyEmailLimiter } from "../middlewares/rateLimiter";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.post('/register-admin', registerAdmin);

router.post('/login-admin', loginAdmin);

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify', verifyEmailLimiter, verifyEmail);

router.post("/resend", resendCodeLimiter, resendVerification);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/get-current-user", verifyUser(), getCurrentUser);

router.put("/update-user", verifyUser(), updateUser);


export default router
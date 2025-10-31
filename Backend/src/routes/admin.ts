import { Router } from "express";
import { allUsers, updateUserStatus } from "../controllers/admin";
import { checkRole } from "../middlewares/checkRole";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.get('/all-users', verifyUser(), checkRole('admin'), allUsers);

router.put('/update-user-status/:id', verifyUser(), checkRole('admin'), updateUserStatus);

export default router
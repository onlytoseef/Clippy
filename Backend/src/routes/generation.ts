import { Router } from 'express';
import {
  generateScript,
  generateImage,
  generateAudio,
  generateVideo
} from '../controllers/generation';
import { verifyUser } from '../middlewares/verifyUser';

const router = Router();

// All generation endpoints require authentication
router.use(verifyUser);

// Script Generation
router.post('/script', generateScript);

// Image Generation
router.post('/image', generateImage);

// Audio Generation
router.post('/audio', generateAudio);

// Video Generation
router.post('/video', generateVideo);

export default router;

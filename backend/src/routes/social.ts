import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import {
  connectAccount,
  disconnectAccount,
  listAccounts,
  postContent,
  schedulePost,
} from '../controllers/social';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Connect social media account
router.post(
  '/connect',
  [
    body('platform').isIn(['twitter', 'facebook', 'instagram']),
    body('accessToken').notEmpty(),
    body('refreshToken').optional(),
  ],
  validateRequest,
  connectAccount
);

// Disconnect social media account
router.delete('/disconnect/:platform', disconnectAccount);

// List connected accounts
router.get('/accounts', listAccounts);

// Post content to social media
router.post(
  '/post',
  [
    body('platform').isIn(['twitter', 'facebook', 'instagram']),
    body('contentId').notEmpty(),
  ],
  validateRequest,
  postContent
);

// Schedule post
router.post(
  '/schedule',
  [
    body('platform').isIn(['twitter', 'facebook', 'instagram']),
    body('contentId').notEmpty(),
    body('scheduleDate').isISO8601(),
  ],
  validateRequest,
  schedulePost
);

export default router; 
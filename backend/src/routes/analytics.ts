import { Router } from 'express';
import { query } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import {
  getContentAnalytics,
  getPlatformAnalytics,
  getOverallAnalytics,
} from '../controllers/analytics';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get content analytics
router.get(
  '/content/:contentId',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validateRequest,
  getContentAnalytics
);

// Get platform analytics
router.get(
  '/platform/:platform',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validateRequest,
  getPlatformAnalytics
);

// Get overall analytics
router.get(
  '/overall',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validateRequest,
  getOverallAnalytics
);

export default router; 
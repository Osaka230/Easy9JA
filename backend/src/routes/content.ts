import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  listContent,
  generateContent,
} from '../controllers/content';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create content
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Content body is required'),
    body('scheduleDate').optional().isISO8601().withMessage('Invalid date format'),
  ],
  validateRequest,
  createContent
);

// Generate content using AI
router.post(
  '/generate',
  [
    body('prompt').notEmpty().withMessage('Prompt is required'),
    body('tone').optional().isString(),
    body('length').optional().isString(),
    body('platform').optional().isString(),
  ],
  validateRequest,
  generateContent
);

// Get content by ID
router.get('/:id', getContent);

// List content
router.get('/', listContent);

// Update content
router.put(
  '/:id',
  [
    body('title').optional().notEmpty(),
    body('body').optional().notEmpty(),
    body('status').optional().isIn(['draft', 'published', 'scheduled']),
    body('scheduleDate').optional().isISO8601(),
  ],
  validateRequest,
  updateContent
);

// Delete content
router.delete('/:id', deleteContent);

export default router; 
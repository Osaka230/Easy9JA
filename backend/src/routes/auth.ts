import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, forgotPassword, resetPassword } from '../controllers/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  validateRequest,
  register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
);

// Logout route
router.post('/logout', logout);

// Forgot password route
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  validateRequest,
  forgotPassword
);

// Reset password route
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  validateRequest,
  resetPassword
);

export default router; 
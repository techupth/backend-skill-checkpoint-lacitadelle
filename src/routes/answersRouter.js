import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleVote, submitAnswer } from '../controllers/answersController.js';

const router = Router();

router.post(
  '/:questionId',
  param('questionId').isMongoId(),
  body('answer').isLength({ max: 300 }).escape(),
  submitAnswer,
);

router.patch('/:questionId/:action', param('action').notEmpty(), handleVote);

export default router;

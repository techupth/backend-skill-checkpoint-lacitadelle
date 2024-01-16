import { Router } from 'express';
import { body } from 'express-validator';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
} from '../controllers/questionsController.js';

const router = Router();

router.get('/', getQuestions);

router.get('/:questionId', getQuestionById);

router.post(
  '/',
  body('title').notEmpty().escape(),
  body('description').notEmpty().escape(),
  body('category').notEmpty().escape(),
  createQuestion,
);

router.put(
  '/:questionId',
  body('title').notEmpty().escape(),
  body('description').notEmpty().escape(),
  body('category').notEmpty().escape(),
  editQuestion,
);

router.delete('/:questionId', deleteQuestion);

export default router;

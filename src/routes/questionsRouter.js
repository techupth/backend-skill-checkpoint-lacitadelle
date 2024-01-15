import { Router } from "express";
import { getAllQuestions, getQuestionById, createQuestion, editQuestion, deleteQuestion } from "../controllers/questionsController.js"
import { body } from "express-validator";

const router = Router();

router.get('/', getAllQuestions);

router.get('/:questionId', getQuestionById);

router.post('/',
  body("title").notEmpty().escape(),
  body("description").notEmpty().escape(),
  body("category").notEmpty().escape(),
  createQuestion
)

router.put('/:questionId',
  body("title").notEmpty().escape(),
  body("description").notEmpty().escape(),
  body("category").notEmpty().escape(),
  editQuestion
)

router.delete('/:questionId', deleteQuestion);

export default router;
import express from 'express';
import questionsRouter from './src/routes/questionsRouter.js';
import answersRouter from './src/routes/answersRouter.js';

async function init() {
  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/questions', questionsRouter);
  app.use('/answers', answersRouter);

  app.get('/', (req, res) => res.json({ message: 'Please consult our API documentation' }));

  app.get('*', (req, res) => res.status(404).json('Not found'));

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();

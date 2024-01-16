import { ObjectId } from 'mongodb';
import { validationResult, matchedData } from 'express-validator';
import e from 'express';
import db from '../utils/db.js';

const coll = db.collection('answers');
const questionsColl = db.collection('questions');

async function submitAnswer(req, res) {
  // check for errors added by the validator.
  const errors = validationResult(req);
  // TODO: Return the right error for invalid query id.
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Answer exceeds 300 characters' });
  }

  const matchedReq = matchedData(req);

  // create an answer tied to a questionId.

  try {
    // look for the requested question
    const doc = await questionsColl.findOne({ _id: new ObjectId(req.params.questionId) });

    if (doc) {
      // create answer in the database if the associated question was found.
      const newAnswer = {
        created_at: new Date(),
        posted_under: new ObjectId(req.params.questionId),
        answer: matchedReq.answer,
        votes: 0,
      };
      const result = await coll.insertOne(newAnswer);
      res.json({
        message: 'Message submitted successfully!',
        data: {
          // result.id returned by insertOne()
          _id: result.insertedId,
          ...newAnswer,
        },
      });
    } else {
      res.status(400).json({ error: 'Could not find question.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// handle upvote and downvote
async function handleVote(req, res) {
  // handle errors from express-validator
  console.log('hi');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Only /upvote or /downvote accepted' });
  }

  if (req.params.action === 'upvote') {
    res.json({ message: 'Upvoted' });
  } else {
    res.json({ message: 'Downvoted' });
  }
}

export { submitAnswer, handleVote };

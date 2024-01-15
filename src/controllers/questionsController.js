import db from "../utils/db.js";
import { ObjectId } from "mongodb";
import { validationResult, matchedData } from "express-validator";

const coll = db.collection("questions");

async function getAllQuestions(req, res) {
  try {
    const result = await coll.find({}).toArray();
    res.json({ data: result });
  } catch (error) {
    // Handle database error
    res.status(500).json({ error: "Couldn't fetch data" });
  }
}

async function getQuestionById(req, res) {
  const questionId = req.params.questionId;
  try {
    const result = await coll.findOne({ _id: new ObjectId(questionId) });
    res.json({ data: result });
  } catch (error) {
    // Handle database error
    res.status(500).json({ error: "Couldn't fetch data" });
  }
}

async function createQuestion(req, res) {
  // handle validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = {
      _id: new ObjectId(),
      ...matchedData(req), // matchedData is the values in req.body validated by express-validator
      created_at: new Date()
    }
    const result = await coll.insertOne(data)
    res.json({
      message: "Question created",
      data
    })
  } catch (error) {
    // Handle database error
    res.status(500).json({ error: "Couldn't insert data" });
  }
}

async function editQuestion(req, res) {
  const questionId = req.params.questionId;
  // handle validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = matchedData(req) // matchedData is the values in req.body validated by express-validator
    const result = await coll.updateOne(
      { _id: new ObjectId(questionId) }, // match this id
      { $set: { ...data } } // update with this info.
    )
    res.json({
      message: "Question updated",
    })
  } catch (error) {
    // Handle database error
    res.status(500).json({ error: "Couldn't update data" });
  }

}

async function deleteQuestion(req, res) {
  const questionId = req.params.questionId;
  try {
    const result = await coll.deleteOne({ _id: new ObjectId(questionId) });
    res.json({ message: "Question with ID: " + questionId + " was deleted." })
  }
  catch (error) {
    // Handle database error
    res.status(500).json({ error: "Couldn't delete data" });
  }
}

export { getAllQuestions, getQuestionById, createQuestion, editQuestion, deleteQuestion };
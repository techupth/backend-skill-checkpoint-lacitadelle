import { MongoClient } from 'mongodb';
const url = "mongodb://localhost:27017/";

let db = null;

async function connect() {
  if (db) return db;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db('platform');
  console.log("Database connected!");
  return db;
}

db = await connect()

export default db;
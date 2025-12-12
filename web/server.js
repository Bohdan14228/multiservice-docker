const os = require('os');
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
app.use(express.json());

// Redis (redis v4)
const redisClient = redis.createClient({ url: 'redis://redis:6379' });
redisClient.on('error', (err) => console.error('Redis error', err));

// Mongo
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/appdb';

const Message = mongoose.model(
  'Message',
  new mongoose.Schema(
    { text: { type: String, required: true } },
    { timestamps: true }
  )
);

app.get('/', async (req, res) => {
  let numVisits = await redisClient.get('numVisits');
  let numVisitsToDisplay = parseInt(numVisits, 10) + 1;

  if (Number.isNaN(numVisitsToDisplay)) numVisitsToDisplay = 1;

  res.send(`${os.hostname()}: Number of visits is: ${numVisitsToDisplay}`);

  await redisClient.set('numVisits', String(numVisitsToDisplay));
});

// --- "API" на Mongo ---
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
  res.json(messages);
});

app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  const msg = await Message.create({ text });
  res.status(201).json(msg);
});

async function start() {
  await redisClient.connect();
  await mongoose.connect(MONGO_URL);
  console.log('✅ Connected to Redis + Mongo');

  app.listen(5000, () => console.log('Web application is listening on port 5000'));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});

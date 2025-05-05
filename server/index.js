// server/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const PORT = 5000;
const boardsRouters = require("./Routes/BoardRoutes");
const authRouters = require("./Routes/AuthRoutes");
const uploadRouters = require('./Routes/uploadRoutes');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB connection error", err));

app.use(cors({
    origin: "http://localhost:3000", 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true 
  }));
app.use(express.json());

app.use("/api", boardsRouters);

app.use("/api", authRouters);

app.use('/api', uploadRouters);

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});




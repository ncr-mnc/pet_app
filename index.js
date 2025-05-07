const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const path = require('path');
const morgan = require('morgan');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("DB connection error", err));

app.use(morgan('combined'));
app.use(cors({
    origin: "http://localhost:3000", 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true 
}));
app.use(express.json());
const clientBuildPath = path.resolve(__dirname, 'client', 'build');
console.log(clientBuildPath);
app.use(express.static(clientBuildPath)); // Corrected line

const boardsRouters = require('./Routes/BoardRoutes');
const authRouters = require('./Routes/AuthRoutes');
const uploadRouters = require('./Routes/uploadRoutes');
app.use("/api", boardsRouters);

app.use("/api", authRouters);

app.use('/api', uploadRouters);


app.get('/*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        return next(); // Pass the request to the next middleware (e.g., 404 handler)
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Сервер запущено на http://localhost:${process.env.PORT}`);
});




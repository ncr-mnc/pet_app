require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');


exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
    
        const token = jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
    
        res.status(201).json({ token });
        } catch (err) {
            console.error("Помилка під час реєстрації:", err);
            res.status(500).json({ error: "Щось пішло не так при реєстрації" });
        }
};

exports.signIn = async(req, res) => {
    const {username, password} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(!existingUser || existingUser.password != password) {
            res.status(401).json({message: 'Invalid username or password!'});
        }
        const token = jwt.sign(
            {id: existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )
        res.status(201).json({token, userId: existingUser._id});
    } catch(err) {
        res.status(500).json({message: 'Invalid login', error: err.message});
        return;
    }
};

exports.getUser = async(req, res) => {
    const userId = req.params.id;
    try {
        const existingUser = await User.findById(userId);
        if(!existingUser) {
            return res.status(401).json({message: 'Invalid fetch to get user'});
        }
        res.status(200).json({username:  existingUser.username})
    } catch(err) {
        res.status(500).json({message: 'Fail to fetch', error: err.message});
    }
};
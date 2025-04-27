const Board = require('../Models/Boards');

exports.createBoard = async (req, res) => {
    try {
        const board = new Board({...req.body, userId: req.user._id});
        await board.save();
        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({message: 'Failed to create board'});
    }
};

exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find({userId: req.user._id});
        res.status(200).json(boards);
    } catch(err) {
        res.status(500).json({message: 'Failed to fetch boards'});
    };
};

exports.deleteBoard = async (req, res) => {
    try {
        await Board.findOneAndDelete({_id: req.params.id, userId: req.user._id});
        const boards = await Board.find({userId: req.user._id});
        res.status(200).json(boards);
    } catch(err) {
        res.status(500).json({message: 'Failed to fetch boards'});
    };
}

exports.editBoard = async (req, res) => {
    try {
        const updated = await Board.findOneAndUpdate(
        {_id: req.params.id, userId: req.user._id},
        req.body,
        {new: true}
        );
        if(!updated) {
            return res.status(404).json({ message: 'Board not found' });
        }
    res.json(updated.toObject());
    } catch(err) {
        return res.status(500).json({ message: 'Failed to update board', error: err.message });
    }
}

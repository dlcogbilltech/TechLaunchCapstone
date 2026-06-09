const Content = require('../models/content.model');

module.exports = {
    //Controls for Contents
    getContents: (req, res) => {
        Content.find()
        .then((allContents) => {
            res.json(allContents);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in findAll', error: err });
        });
    },
    
    createContent: (req, res) => {
        Content.create(req.body)
        .then((newContent) => {
            res.json(newContent);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in create', error: err });
        });
    },
    
    getContentsById: (req, res) => {
        Content.findOne({ _id: req.params.id })
        .then((oneContent) => {
            res.json(oneContent);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in findById', error: err });
        });
    },
    
    deleteContent: (req, res) => {
        Content.deleteOne({ _id: req.params.id })
        .then((content) => {
            res.json(content);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in delete', error: err });
        });
    },
    
    updateContent: (req, res) => {
        Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedContent) => {
            res.json(updatedContent);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in update', error: err });
        });
    },
}
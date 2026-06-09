const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required!'],
            minlength: [3, 'Title must be at least 3 characters!'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
            minlength: [3, 'Description must be at least 3 characters!'],
        },
        fileUrl: {
            type: String,
            required: [true, 'File URL is required!']
        },
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail is required!']
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }
        ],
        comments: [{
            author: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            },
            comment: {
                type: String,
                minlength: [3, 'Comment must be at least 3 characters!'],
            }
        }],
    },
    {
        timestamps: true
    }
);

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
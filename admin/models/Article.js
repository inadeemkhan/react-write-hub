const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [150, 'Title cannot exceed 150 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (v) {
        return v.every(tag => tag.length <= 30);
      },
      message: 'Each tag should be 30 characters or less',
    }
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  comments: [
    {
      commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      text: {
        type: String,
        required: true,
        maxlength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
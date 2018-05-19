const {mongoose} = require('../database');

const Comment = mongoose.model(
  'Comment',
  mongoose.Schema({
    video_id: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  })
);

module.exports = Comment;

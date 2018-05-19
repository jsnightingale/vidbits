const {assert} = require('chai');
const Comment = require('../../models/comment');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Model: Comment', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('#video_id', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const comment = new Comment({video_id: titleAsNonString});

      assert.strictEqual(comment.video_id, titleAsNonString.toString());
    });
    });
  describe('#author', () => {
    it('is a String', () => {
      const authorAsNonString = 1;
      const comment = new Comment({author: authorAsNonString});

      assert.strictEqual(comment.author, authorAsNonString.toString());
    });
  });
  describe('#message', () => {
    it('is a String', () => {
      const messageAsNonString = 1;
      const comment = new Comment({message: messageAsNonString});

      assert.strictEqual(comment.message, messageAsNonString.toString());
    });
  });
});

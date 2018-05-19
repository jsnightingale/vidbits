const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Comment = require('../../models/comment');

const {parseTextFromHTML, buildCommentObject, seedVideoToDatabase, seedCommentToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Server Path: /videos/:id/comment/add', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('view a comment', async () => {
      const video = await seedVideoToDatabase();
      const comment = await seedCommentToDatabase({video_id: video._id});
      const response = await request(app)
        .get(`/videos/show/${video._id}`);

      assert.include(parseTextFromHTML(response.text, '.comment .author'), comment.author);
      assert.include(parseTextFromHTML(response.text, '.comment .message'), comment.message);
    });

    it('view a comment page', async () => {
      const video = await seedVideoToDatabase();
      const comment = await seedCommentToDatabase({video_id: video._id});
      const response = await request(app)
        .get(`/videos/${video._id}/comment/add`);

      assert.include(parseTextFromHTML(response.text, '#author'), '');
      assert.include(parseTextFromHTML(response.text, '#message'), '');
    });
  });

  describe('POST', () => {
    it('save a comment', async () => {
      const video = await seedVideoToDatabase();
      const commentToCreate = buildCommentObject(video._id);
      const response = await request(app)
        .post(`/videos/${video._id}/comment/add`)
        .type('form')
        .send(commentToCreate)
        .expect(302);

      const createdComment = await Comment.findOne(commentToCreate);
      assert.isOk(createdComment, 'Comment was not created successfully in the database');
    });
    it('displays an error message when supplied an empty author', async () => {
      const invalidCommentToCreate = {
        message: 'This is an invalid message'
      };
      const video = await seedVideoToDatabase();
      const response = await request(app)
        .post(`/videos/${video._id}/comment/add`)
        .type('form')
        .send(invalidCommentToCreate);
      const allComments = await Comment.find({});
      assert.equal(allComments.length, 0);
      assert.equal(response.status, 400);
      assert.include(response.text, invalidCommentToCreate.message);
      assert.include(parseTextFromHTML(response.text, 'form div#author'), 'required');
    });
    it('displays an error message when supplied an empty message', async () => {
      const invalidCommentToCreate = {
        author: 'Invalid Author'
      };
      const video = await seedVideoToDatabase();
      const response = await request(app)
        .post(`/videos/${video._id}/comment/add`)
        .type('form')
        .send(invalidCommentToCreate);
      const allComments = await Comment.find({});
      assert.equal(allComments.length, 0);
      assert.equal(response.status, 400);
      assert.include(response.text, invalidCommentToCreate.author);
      assert.include(parseTextFromHTML(response.text, 'form div#message'), 'required');
    });
  });
});

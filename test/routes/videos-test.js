const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Server Path: /videos', () => {
  const video = buildVideoObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET',() => {
    it('renders an empty form', async() => {
      const response = await request(app)
        .get('/videos/create');

      assert.include(parseTextFromHTML(response.text, '#video-title'), '');
      assert.include(parseTextFromHTML(response.text,'#video-description'), '');
      assert.include(parseTextFromHTML(response.text,'#video-url'), '');
    });
  });

  describe('POST', () => {
    it('create and saves a new video', async () => {
      const videoToCreate = buildVideoObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(videoToCreate)
        .expect(302);
      const createdVideo = await Video.findOne(videoToCreate);
      assert.isOk(createdVideo, 'Video was not created successfully in the database');
    });
    it('displays an error message when supplied an empty title', async () => {
      const invalidVideoToCreate = {
        description: 'test',
        url: 'http://example.com'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(response.text, invalidVideoToCreate.url);
      assert.include(parseTextFromHTML(response.text, 'form div#title'), 'required');
      assert.include(parseTextFromHTML(response.text, '#video-description'), invalidVideoToCreate.description);
    });
    it('displays an error message when supplied an empty description', async () => {
      const invalidVideoToCreate = {
        title: 'Test title',
        url: 'http://example.com'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(response.text, invalidVideoToCreate.title);
      assert.include(response.text, invalidVideoToCreate.url);
      assert.include(parseTextFromHTML(response.text, 'form div#description'), 'required');

    });
    it('displays an error message when supplied an empty video url', async () => {
      const invalidVideoToCreate = {
        title: 'Test title',
        description: 'Test description'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(response.text, invalidVideoToCreate.title);
      assert.include(parseTextFromHTML(response.text, 'form div#url'), 'required');
      assert.include(parseTextFromHTML(response.text, '#video-description'), invalidVideoToCreate.description);
    });
  });
});

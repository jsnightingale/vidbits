const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Server Path: /videos/show:id', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('view a video', async () => {
      const video = await seedVideoToDatabase();
      const response = await request(app)
        .get(`/videos/show/${video._id}`);

      assert.include(parseTextFromHTML(response.text, '#video-title'), video.title);
      assert.include(parseTextFromHTML(response.text, '#video-description'), video.description);
      assert.include(response.text, 'iframe');
      assert.include(response.text, video.url);
    });
  });
  describe('POST',() => {
    it('updates existing video', async () => {
      const seededVideo = await seedVideoToDatabase();
      seededVideo.title = 'New Title';
      const response = await request(app)
        .post(`/videos/update/${seededVideo._id}`)
        .send(seededVideo)
        .expect(302);
    });
    it('does not save if title is empty', async () => {
      const seededVideo = await seedVideoToDatabase();
      seededVideo.title = '';
      const response = await request(app)
        .post(`/videos/update/${seededVideo._id}`)
        .send(seededVideo);
    });
    it('does not save if description is empty', async () => {
      const seededVideo = await seedVideoToDatabase();
      seededVideo.description = '';
      const response = await request(app)
        .post(`/videos/update/${seededVideo._id}`)
        .send(seededVideo);
    });
    it('does not save if url is empty', async () => {
      const seededVideo = await seedVideoToDatabase();
      seededVideo.url = '';
      const response = await request(app)
        .post(`/videos/update/${seededVideo._id}`)
        .send(seededVideo);
    });
    it('removes video', async () => {
      const seededVideo = await seedVideoToDatabase();
      const response = await request(app)
        .post(`/videos/delete/${seededVideo._id}`);
    });
  });
});

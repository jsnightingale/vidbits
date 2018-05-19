const {jsdom} = require('jsdom');
const Video = require('../models/video');
const Comment = require('../models/comment');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'Test title';
  const description = options.description || 'This is a description';
  const url = options.url || 'http://example.com';
  return {title, description, url};
};

// Create and return a sample Comment object
const buildCommentObject = (options = {}) => {
  const video_id = options.video_id || 0;
  const author = options.author || 'Jackson Nightingale';
  const message = options.message || 'This is a test comment for testing purposes';
  return {video_id, author, message};
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const seedVideoToDatabase = (options = {}) => {
  return Video.create(buildVideoObject(options));
};

const seedCommentToDatabase = (options = {}) => {
  return Comment.create(buildCommentObject(options));
};

module.exports = {
  parseTextFromHTML,
  buildVideoObject,
  buildCommentObject,
  seedVideoToDatabase,
  seedCommentToDatabase,
};

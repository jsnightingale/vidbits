const router = require('express').Router();
const Video = require('../models/video');
const Comment = require('../models/comment');

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', {videos});
});

router.get('/videos/create', (req, res, next) => {
  res.render('videos/create');
});

router.get('/videos/update/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/edit', {video});
});

router.get('/videos/show/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  const comments = await Comment.find({'video_id': video._id});
  res.render('videos/show', {video: video, comments: comments});
});

router.get('/videos/:id/comment/add', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/comment', {video});
});

router.post('/videos/update/:id', async (req, res, next) => {
  const video = req.body;
  const updatedVideo = await Video.update({_id: req.params.id}, req.body, {runValidators: true}, function(err, result) {
    if (err) {
      video._id = req.params.id;
      video.errors = err.errors;
      res.status(400).render(`videos/edit`, {video});
    } else {
      res.redirect(`/videos/show/${req.params.id}`);
    }
  });
});

router.post('/videos/delete/:id', async (req, res, next) => {
  await Video.remove({'_id': req.params.id});
  res.redirect('/');
});

router.post('/videos/create', async (req, res, next) => {
  const {title, description, url} = req.body;
  const newVideo = new Video({title, description, url});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('videos/create', {newVideo});
  } else {
    await newVideo.save();
    res.redirect(`/videos/show/${newVideo._id}`);
  }
});

router.post('/videos/:id/comment/add', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  const {video_id, author, message} = req.body;
  const newComment = new Comment({video_id, author, message});
  newComment.validateSync();
  if (newComment.errors) {
    res.status(400).render('videos/comment', {video: video, comment: newComment});
  } else {
    await newComment.save();
    res.redirect(`/videos/show/${req.params.id}`);
  }
});

module.exports = router;

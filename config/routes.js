const express = require('express');
const router  = express.Router();

const albums  = require('../controllers/albums');
const artists  = require('../controllers/artists');
const tracks  = require('../controllers/tracks');

router.route('/').get((req, res) => res.render('home'));

router.route('/albums')
  .get(albums.index)
  .post(albums.create);
router.route('/albums/new')
.get(albums.new);
router.route('/albums/:id')
.get(albums.show)
.put(albums.update)
.delete(albums.delete);
router.route('/albums/:id/edit')
.get(albums.edit);

router.route('/albums/:id/tracks')
  .post(tracks.create);

router.route('/artists')
  .get(artists.index)
  .post(artists.create);
router.route('/artists/new')
  .get(artists.new);
router.route('/artists/:id')
  .get(artists.show)
  .put(artists.update)
  .delete(artists.delete);
router.route('/artists/:id/edit')
  .get(artists.edit);


module.exports = router;

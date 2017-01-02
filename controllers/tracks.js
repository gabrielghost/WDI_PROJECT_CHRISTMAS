const Track = require('../models/track');
const Album = require('../models/album.js');
const Artist = require('../models/artist.js');

function tracksNew(req, res) {
  Artist.find({}, (err, artists) => {
    if (err) return res.render('tracks/new', { error: err.message });
    Album.find({}, (err, albums) => {
      if (err) return res.render('tracks/new', { error: err.message });
      return res.render('tracks/new', { error: null, albums, artists });
    });
  });
}

function tracksCreate(req, res) {
  const track = new Track(req.body.track);
  track.save(err => {
    if (err) return res.render('tracks/new', { error: err.message });
    return res.redirect('/tracks');
  });
}

function tracksIndex(req, res) {
  Track
  .find({})
  .populate(['album_name', 'artist'])
  .exec((err, tracks) => {
    if (err) return res.render('tracks/index', { tracks: null, error: 'Something went wrong.' });
    return res.render('tracks/index', { tracks });
  });
}

function tracksShow(req, res) {
  Track
  .findById(req.params.id)
  .populate(['album_name', 'artist'])
  .exec((err, track) => {
    if (err) return res.render('tracks/show', { track: {}, error: 'Something went wrong.' });
    if (!track) return res.render('tracks/show', { track: {}, error: 'No track was found!' });
    return res.render('tracks/show', { track, error: null });
  });
}





function tracksEdit(req, res) {
  Track.findById(req.params.id, (err, track) => {
    if (err) return res.render('tracks/edit', { track: {}, error: 'Something went wrong.' });
    if (!track) return res.render('tracks/edit', { album: {}, error: 'No track was found!' });
    Artist.find({}, (err, artists) => {
      if (err) return res.render('albums/new', { error: err.message });
      Album.find({}, (err, albums) => {
        if (err) return res.render('albums/new', { error: err.message });
        return res.render('tracks/edit', { track, albums, artists, error: null });
      });
    });
  });
}


function tracksUpdate(req, res) {
  Track.findById(req.params.id, (err, track) => {
    if (err) return res.render('tracks/edit', { track: {}, error: 'Something went wrong.' });
    if (!track) return res.render('tracks/edit', { track: {}, error: 'No track was found!' });

    for (const field in Track.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.track[field] !== undefined) {
          track[field] = req.body.track[field];
        }
      }
    }

    track.save((err, track) => {
      if (err) return res.render('tracks/edit', { track: {}, error: 'Something went wrong.' });
      return res.redirect(`/tracks`);
    });
  });
}

function tracksDelete(req, res) {
  Track.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('tracks/show', { track: {}, error: 'Something went wrong.' });
    return res.redirect('/tracks');
  });
}

module.exports = {
  index: tracksIndex,
  new: tracksNew,
  create: tracksCreate,
  show: tracksShow,
  edit: tracksEdit,
  update: tracksUpdate,
  delete: tracksDelete
};

const Artist = require('../models/artist');

function artistsNew(req, res) {
  return res.render('artists/new', { error: null });
}

function artistsCreate(req, res) {
  const artist = new Artist(req.body.artist);
  artist.save(err => {
    if (err) return res.render('artists/new', { error: err.message });
    return res.redirect('/artists');
  });
}

function artistsIndex(req, res) {
  Artist.find({}, (err, artists) => {
    if (err) return res.render('artists/index', { artists: null, error: 'Something went wrong.' });
    return res.render('artists/index', { artists });
  });
}

function artistsShow(req, res) {
  Artist.findById(req.params.id, (err, artist) => {
    if (err) return res.render('artists/show', { artist: {}, error: 'Something went wrong.' });
    if (!artist) return res.render('artists/show', { artist: {}, error: 'No artist was found!' });
    return res.render('artists/show', { artist, error: null });
  });
}

function artistsEdit(req, res) {
  Artist.findById(req.params.id, (err, artist) => {
    if (err) return res.render('artists/edit', { artist: {}, error: 'Something went wrong.' });
    if (!artist) return res.render('artists/edit', { artist: {}, error: 'No artist was found!' });
    return res.render('artists/edit', { artist, error: null });
  });
}

function artistsUpdate(req, res) {
  Artist.findById(req.params.id, (err, artist) => {
    if (err) return res.render('artists/edit', { artist: {}, error: 'Something went wrong.' });
    if (!artist) return res.render('artists/edit', { artist: {}, error: 'No artist was found!' });

    for (const field in Artist.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.artist[field] !== undefined) {
          artist[field] = req.body.artist[field];
        }
      }
    }

    artist.save((err, artist) => {
      if (err) return res.render('artists/edit', { artist: {}, error: 'Something went wrong.' });
      return res.redirect(`/artists/${artist._id}`);
    });
  });
}

function artistsDelete(req, res) {
  Artist.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('artists/show', { artist: {}, error: 'Something went wrong.' });
    return res.redirect('/artists');
  });
}

module.exports = {
  index: artistsIndex,
  new: artistsNew,
  create: artistsCreate,
  show: artistsShow,
  edit: artistsEdit,
  update: artistsUpdate,
  delete: artistsDelete
};

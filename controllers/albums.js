const Album = require('../models/album.js');
const Artist = require('../models/artist.js');

//NEW

function albumsNew(req, res) {
  Artist.find({}, (err, artists) => {
    if (err) return res.render('albums/new', { error: err.message });
    return res.render('albums/new', { error: null, artists });
  });
}

//CREATE

function albumsCreate(req, res){
  const album = new Album(req.body.album);
  album.save(err => {
    if (err) return res.render('albums/new', { error: err.message });
    return res.redirect('/albums');
  });
}
//index

function albumsIndex(req, res){
  Album
  .find({})
  .populate(['artist'])
  .exec((err, albums) => {
    if (err) return res.render('albums/index', { albums: null, error: 'Something went wrong' });
    return res.render('albums/index', { albums });
  });
}
//SHOW

function albumsShow(req, res) {
  Album
  .findById(req.params.id)
  .populate(['artist'])
  .exec((err, album) => {
    if (err) return res.render('albums/show', { album: {}, error: 'Something went wrong.' });
    if (!album) return res.render('albums/show', { album: {}, error: 'No movie was found!' });
    return res.render('albums/show', { album, error: null });
  });
}
//EDIT

function albumsEdit(req, res) {
  Album.findById(req.params.id, (err, album) => {
    if (err) return res.render('albums/edit', { album: {}, error: 'Something went wrong.' });
    if (!album) return res.render('albums/edit', { album: {}, error: 'No movie was found!' });
    Artist.find({}, (err, artists) => {
      if (err) return res.render('albums/new', { error: err.message });
      return res.render('albums/edit', { album, artists, error: null });
    });
  });
}

//UPDATE

function albumsUpdate(req, res){
  Album.findById(req.params.id, (err, album) => {
    if (err) return res.render('albums/edit', {
      album: {}, error: 'Something went wrong' });
    if (!album) return res.render('albums/edit', { album: {}, error: 'No album was found'});

    for (const field in Album.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.album[field] !== undefined) {
          album[field] = req.body.album[field];
        }
      }
    }

    album.save((err, album) => {
      if (err) return res.render('albums/edit', { album: {}, error: 'Something went wrong.' });
      return res.redirect(`/albums/${album._id}`);
    });
  });
}

//DELETE


function albumsDelete(req, res) {
  Album.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('albums/show', { movie: {}, error: 'Something went wrong.' });
    return res.redirect('/albums');
  });
}

module.exports = {
  index: albumsIndex,
  new: albumsNew,
  edit: albumsEdit,
  show: albumsShow,
  create: albumsCreate,
  update: albumsUpdate,
  delete: albumsDelete
};

const Album = require('../models/album');

function tracksCreate(req, res) {
  Album.findById(req.params.id, (err, album) => {
    if (err) return res.render('albums/show', { album: {}, error: 'Something went wrong.' });
    if (!album) return res.render('albums/show', { album: {}, error: 'No album was found!' });

    album.tracks.push(req.body.track);

    album.save((err, album) => {
      if (err) return res.render('albums/show', { album: {}, error: 'Something went wrong.' });
      return res.redirect(`/albums/${album._id}`);
    });
  });
}

module.exports = {
  create: tracksCreate
};

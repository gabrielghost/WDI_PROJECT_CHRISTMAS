const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  album_name: { type: String, trim: true, required: true },
  artist: { type: mongoose.Schema.ObjectId, ref: 'Artist' },
  artwork: { type: String, trim: true, required: true },
  comment: { type: String, trim: true },
  tracks: [{
    track_name: { type: String, trim: true },
    track_duration: { type: Number, trim: true },
    track_number: { type: Number, trim: true }
  }]
},{
  timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);

const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  track_name: { type: String, trim: true, required: true },
  album_name: { type: mongoose.Schema.ObjectId, ref: 'Album' },
  artist: { type: mongoose.Schema.ObjectId, ref: 'Artist' },
  track_duration: { type: Number },
  track_number: { type: Number, trim: true },
  audio_path: { type: String }
},{
  timestamps: true
});

module.exports = mongoose.model('Track', trackSchema);

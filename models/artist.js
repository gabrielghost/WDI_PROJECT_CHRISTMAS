const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);

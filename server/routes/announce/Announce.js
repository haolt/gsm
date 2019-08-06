var mongoose = require('mongoose');
var AnnounceSchema = new mongoose.Schema({
  createdBy: Object,
  assignTo: Array,
  content: String,
  votes: Array,
  createdAt: Date
});
mongoose.model('Announce', AnnounceSchema);

module.exports = mongoose.model('Announce');

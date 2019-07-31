var mongoose = require('mongoose');
var RequestSchema = new mongoose.Schema({
  checkTime: Date,
  compensationFromTime: Date,
  compensationToTime: Date,
  createdAt: Date,
  createdBy: Object,
  status: String,
  reason: String,
  type: String
});
mongoose.model('Request', RequestSchema);

module.exports = mongoose.model('Request');

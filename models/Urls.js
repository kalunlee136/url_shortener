var mongoose = require('mongoose');

var UrlSchema = new mongoose.Schema({
    original_url: String
});

module.exports = mongoose.model('Url',UrlSchema);

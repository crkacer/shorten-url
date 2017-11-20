const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// create schema
const UrlSchema = new Schema({
    shortURL: {
        type: String,
        required: true
    },
    originalURL: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Url = mongoose.model('Url', UrlSchema);


module.exports = Url;
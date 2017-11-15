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
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


const randomString = (length) => {
    return crypto.randomBytes(Math.ceil(length * (3 / 4)))
            .toString('base64')
            .slice(0, length)
            .replace(/\+/g, '9')
            .replace(/\//g, '9');
}

const appendPrefix = (url) => {
    const pattern = /^((http|https|ftp):\/\/)/;

    if (!pattern.test(url)) {
        url = `http://${url}`; // eslint-disable-line
    }
    return url;
};



const Url = mongoose.model('Url', UrlSchema);

UrlSchema.pre('save', true, function(next, done) {
    this.shortUrl = randomString(7);
    this.originalURL = appendPrefix(this.originalURL);
    // if we have already this shortUrl we just keep doing until we have a random one
    mongoose.models.Url.findOne({ shortUrl: this.shortUrl })
    .then(url => {
        if (url) {
        this.shortUrl = randomString(7);
        }
        return done();
    })
    .catch(err => done(err));
    next();
});

module.exports = Url;
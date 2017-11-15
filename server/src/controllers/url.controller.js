const isURL = require('validator/lib/isURL')
require('../models/Url');
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const crypto = require('crypto');

const randomString = (length) => {
    return crypto.randomBytes(Math.ceil(length * (3 / 4)))
            .toString('base64')
            .slice(0, length)
            .replace(/\+/g, '9')
            .replace(/\//g, '9');
}

module.exports = {
    sendURL (req, res) {
        let longUrl = req.body.longUrl;
        
        if (!longUrl) {
            return res.status(400).json({ success: false, message: 'An URL must be provided!' });
        } else if (!isURL(longUrl)) {
            return res.status(400).json({ success: false, message: 'A valid URL must be provided!' });
        }
    
        const prefix = /^((ftp|http|https):\/\/)/;
    
        if (!prefix.test(longUrl)) {
            longUrl = `http://${longUrl}`; 
        }
        
        // Find that URL in database
        return Url.findOne({ longUrl })
        .then(url => {
            // if cannot find, create a new record
            if (!url) {
                // create a random string, and find it in database.
                const newShortURL = randomString(7);
                Url.findOne({ shortUrl: newShortURL })
                    .then(url => {
                        if (url) {
                            newShortURL = randomString(7);
                        }
                        return done();
                    })
                    .catch(err => done(err));
                // add new record        
                const newUrl = new Url({ shortURL: newShortURL, originalURL: longUrl });
                return newUrl.save()
                    .then(u => res.status(201).json({ success: true, url: u }))
                    .catch(err => {
                    let errors;
                    if (err.code === 11000) {
                        errors = 'This url is already use';
                        return res.status(400).json({ success: false, error: errors });
                    }
                    return res.status(400).json({ success: false, err });
                    
                    });
            }
            // if found, return that url
            return res.status(200).json({ success: true, url });
        })
        .catch(err => res.status(400).json({ success: false, message: err }));
    },

    returnLong (req, res) {
        const { shortUrl } = req.params;
        
        console.log('RETURNING', { shortUrl });
    
        return Url.findOne({ shortUrl })
        .then(url => {
            // if we dont find a url we redirect back to home page
            if (!url) { return res.redirect('/').json({ success: false, message: 'This url not exist in the system' }); }
            // we redirect to external url
            console.log('URL', { url });
            return res.redirect(url.longUrl);
        })
        .catch(err => res.redirect('/').json({ success: false, message: err }));
    }
} 
    

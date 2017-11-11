module.exports = {
    sendURL (req, res) {
        res.send({
            message: `URL ${req.body.url} is received`
        });
    },

    sendReport (req, res) {
        res.send({
            message: `Report is failed`
        })
    }
} 
    

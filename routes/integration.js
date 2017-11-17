const Integration = require('../models/integrations');
const config = require('../config/database');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // DEV
        cb(null, 'client/src/assets/')
        // PROD
        // cb(null, 'public/assets/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

let upload = multer({ storage: storage }).single('img');

module.exports = (router) => {
    /*** POST TO MULTER **/
    router.post('/integrationImage', upload, (req, res) => {
        upload(req, res, (err, url) => {
            if(err) {
                res.json({ success: false, message: 'There was an error uploading the image', err });
            }
            res.json({ success: true, url: req.file.filename });
        });
    });
    /** CREATE NEW INTEGRATION **/
    router.post('/newIntegration', (req, res) => {
        if(!req.body.url) {
            res.json({ success: false, message: 'URL is required' });
        } else {
            if(!req.body.imgPath) {
                res.json({ success: false, message: 'Image is required' });
            } else {
                const integration = new Integration({
                    url: req.body.url,
                    imgPath: req.body.imgPath
                });
                integration.save((err) => {
                    if(err) {
                        if(err.errors) {
                            res.json({ success: false, message: err.errors.url.message });
                        } else {
                            if(err.errors.imgPath) {
                                res.json({ success: false, message: err.errors.imgPath.message });
                            } else {
                                res.json({ success: false, message: err });
                            }
                        }
                    }  else {
                        res.json({ success: true, message: 'Integration saved' });
                    }
                });
            }
        }
    });
    /** GET ALL INTEGRATIONS **/
    router.get('/allIntegrations', (req, res) => {
        Integration.find({}, (err, integrations) => {
            if(err) {
                res.json({ success: false, message: err });
            } else {
                if(!integrations) {
                    res.json({ success: false, message: 'No integrations found' });
                } else {
                    res.json({ success: true, integrations: integrations });
                }
            }
        }).sort({ '_id': 1  });
    });

    /** DELETE INTEGRATION **/
    router.delete('/deleteIntegration/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No ID provided' });
        } else {
            Integration.findOne({ _id: req.params.id }, (err, integration) => {
                if(err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if(!integration) {
                        res.json({ success: false, message: 'Integration was not found' });
                    } else {
                        integration.remove((err) => {
                            if(err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Integration deleted' });
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};
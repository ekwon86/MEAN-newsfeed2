const Feature = require('../models/feature');
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
    router.post('/featureImage', upload, (req, res) => {
        upload(req, res, (err, url) => {
            if(err) {
                res.json({ success: false, message: 'There was an error uploading the image', err });
            }
            res.json({ success: true, url: req.file.filename });
        });
    });
    /** CREATE NEW FEATURE **/
    router.post('/newFeature', (req, res) => {
        if(!req.body.name) {
            res.json({ success: false, message: 'Feature name is required' });
        } else {
            if(!req.body.description) {
                res.json({ success: false, message: 'Feature description is required' });
            } else {
                if(!req.body.imgPath) {
                    res.json({ success: false, message: 'Feature image is required' });
                } else {
                    if(!req.body.type) {
                        res.json({ success: false, message: 'Feature type is required' });
                    } else {
                        const feature = new Feature({
                            name: req.body.name,
                            description: req.body.description,
                            imgPath: req.body.imgPath,
                            type: req.body.type
                        });
                        feature.save((err) => {
                            if(err) {
                                if(err.errors) {
                                    if(err.errors.name) {
                                        res.json({ success: false, message: err.errors.name.message });
                                    }  else {
                                        if(err.errors.description) {
                                            res.json({ success: false, message: err.errors.description.message });
                                        } else {
                                            if(err.errors.imgPath) {
                                                res.json({ success: false, message: err.errors.imgPath.message });
                                            } else {
                                                if(err.errors.type) {
                                                    res.json({ success: false, message: err.errors.type.message });
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: err });
                                }
                            } else {
                                res.json({ success: true, message: 'Feature saved!'});
                            }
                        });
                    }
                }
            }
        }
    });


    /** GET SINGLE FEATURE **/
    router.get('/singleFeature/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No feature ID was provided' });
        } else {
            Feature.findOne({ _id: req.params.id }, (err, feature) => {
                if(err) {
                    res.json({ success: false, message: 'Not a valid feature ID' });
                } else {
                    if(!feature) {
                        res.json({ success: false, message: 'Feature not found' });
                    } else {
                        res.json({ success: true, feature: feature });
                    }
                }
            });
        }
    });

    /** GET ALL FEATURES **/
    router.get('/allFeatures', (req, res) => {
        Feature.find({}, (err, features) => {
            if(err) {
                res.json({ success: false, message: err });
            } else {
                if(!features) {
                    res.json({ success: false, message: 'No features found.' });
                } else {
                    res.json({ success: true, features: features });
                }
            }
        }).sort({ '_id': 1 });
    });

    /** UPDATE FEATURE **/
    router.put('/updateFeature', (req, res) => {
        if(!req.body._id) {
            res.json({ success: false, message: 'No feature ID was provided' });
        } else {
            Feature.findOne({ _id: req.body._id }, (err, feature) => {
                if(err) {
                    res.json({ success: false, message: 'Not a valid feature ID' });
                } else {
                    if(!feature) {
                        res.json({ success: false, message: 'Feature ID was not found' });
                    } else {
                        feature.name = req.body.name;
                        feature.description = req.body.description;
                        feature.type = req.body.type;
                        feature.save((err) => {
                            if(err) {
                                if(err.errors) {
                                    res.json({ success: false, message: 'Please ensure this form is filled out properly' });
                                } else {
                                    res.json({ success: false, message: err });
                                }
                            } else {
                                res.json({ success: true, message: 'Feature has been updated' });
                            }
                        });
                    }
                }
            });
        }
    });

    /** DELETE FEATURE **/
    router.delete('/deleteFeature/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No ID provided' });
        } else {
            Feature.findOne({ _id: req.params.id }, (err, feature) => {
                if(err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if(!feature) {
                        res.json({ success: false, message: 'Feature was not found' });
                    } else {
                        feature.remove((err) => {
                            if(err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Feature deleted' });
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};
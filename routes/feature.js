const Feature = require('../models/feature');
const config = require('../config/database');

module.exports = (router) => {
    /** CREATE NEW FEATURE **/
    router.post('/newFeature', (req, res) => {
        if(!req.body.name) {
            res.json({ success: false, message: 'Feature name is required' });
        } else {
            if(!req.body.description) {
                res.json({ success: false, message: 'Feature description is required' });
            } else {
                if(!req.body.type) {
                    res.json({ success: false, message: 'Feature type is required' });
                } else {
                    const feature = new Feature({
                        name: req.body.name,
                        description: req.body.description,
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
                                        if(err.errors.type) {
                                            res.json({ success: false, message: err.errors.type.message });
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
                    res.json({ success: true, events: features });
                }
            }
        }).sort({ '_id': 1 });
    });

    return router;
};
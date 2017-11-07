const Event = require('../models/event');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/newEvent', (req, res) => {
        if(!req.body.name) {
            res.json({ success: false, message: 'Event name is required' });
        } else {
            if(!req.body.date) {
                res.json({ success: false, message: 'Event date is required' });
            } else {
                if(!req.body.city) {
                    res.json({ success: false, message: 'Event city is required' });
                } else {
                    if(!req.body.state) {
                        res.json({ success: false, message: 'Event state is required' });
                    } else {
                        if(!req.body.url) {
                            res.json({ success: false, message: 'Event URL is required' });
                        } else {
                            const event = new Event({
                                name: req.body.name,
                                date: req.body.date,
                                city: req.body.city,
                                state: req.body.state,
                                url: req.body.url
                            });

                            event.save((err) => {
                                if(err) {
                                    if(err.errors) {
                                        if(err.errors.name) {
                                            res.json({ success: false, message: err.errors.name.message });
                                        }  else {
                                            if(err.errors.date) {
                                                res.json({ success: false, message: err.errors.date.message });
                                            } else {
                                                if(err.errors.city) {
                                                    res.json({ success: false, message: err.errors.city.message });
                                                } else {
                                                    if(err.errors.state) {
                                                        res.json({ success: false, message: err.errors.state.message });
                                                    } else {
                                                        if(err.errors.url) {
                                                            res.json({ success: false, message: err.errors.url.message });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        res.json({ success: false, message: err });
                                    }
                                } else {
                                    res.json({ success: true, message: 'Event saved!'});
                                }
                            });
                        }
                    }
                }
            }
        }
    });
    return router;
};
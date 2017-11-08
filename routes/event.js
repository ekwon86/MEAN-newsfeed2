const Event = require('../models/event');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    /** CREATE NEW EVENT ROUTE **/
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

    /** GET SINGLE EVENT **/
    router.get('/singleEvent/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No event ID was provided' });
        } else {
            Event.findOne({ _id: req.params.id }, (err, event) => {
                if(err) {
                    res.json({ success: false, message: 'Not a valid event ID' });
                } else {
                    if(!event) {
                        res.json({ success: false, message: 'Event not found' });
                    } else {
                        res.json({ success: true, event: event });
                    }
                }
            });
        }
    });

    /** GET ALL EVENTS **/
    router.get('/allEvents', (req, res) => {
        Event.find({}, (err, events) => {
            if(err) {
                res.json({ success: false, message: err });
            } else {
                if(!events) {
                    res.json({ success: false, message: 'No events found.' });
                } else {
                    res.json({ success: true, events: events });
                }
            }
        }).sort({ '_id': 1 });
    });

    /** DELETE EVENT **/
    router.delete('/deleteEvent/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No ID provided' });
        } else {
            Event.findOne({ _id: req.params.id }, (err, event) => {
                if(err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if(!event) {
                        res.json({ success: false, message: 'Event was not found' });
                    } else {
                        event.remove((err) => {
                            if(err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Event deleted' });
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};
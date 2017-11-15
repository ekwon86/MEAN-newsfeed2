const News = require('../models/news');
const config = require('../config/database');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 100000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('newsImage');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = (router) => {
    router.post('/newsImage', (req, res) => {
        upload(req, res, (err) => {
            if(err) {
                res.json({ success: false, message: 'There was an error uploading the image' });
            } else {
                res.json({ success: true, message: 'Image uploaded' });
            }
        });
    });
    /** CREATE NEW NEWS ARTICLE ROUTE **/
    router.post('/newNews', (req, res) => {
        if(!req.body.title) {
            res.json({ success: false, message: 'News article title is required' });
        } else {
            if(!req.body.date) {
                res.json({ success: false, message: 'Date is required' });
            } else {
                if(!req.body.snippet) {
                    res.json({ success: false, message: 'Snippet is required' });
                } else {
                    if(!req.body.img) {
                        res.json({ success: false, message: 'Image name is required' });
                    } else {
                        if(!req.body.url) {
                            res.json({ success: false, message: 'News URL is required' });
                        } else {
                            const news = new News({
                                title: req.body.title,
                                date: req.body.date,
                                snippet: req.body.snippet,
                                img: req.body.img,
                                url: req.body.url
                            });
                            news.save((err) => {
                                if(err) {
                                    if(err.errors) {
                                        if(err.errors.name) {
                                            res.json({ success: false, message: err.errors.title.message });
                                        } else {
                                            if(err.errors.date) {
                                                res.json({ success: false, message: err.errors.date.message });
                                            } else {
                                                if(err.errors.snippet) {
                                                    res.json({ success: false, message: err.errors.snippet.message });
                                                } else {
                                                    if(err.errors.img) {
                                                        res.json({ success: false, message: err.errors.img.message });
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
                                    res.json({ success: true, message: 'News article saved!' });
                                }
                            });
                        }
                    }
                }
            }
        }
    });

    /** GET ALL NEWS ARTICLES **/
    router.get('/allNews', (req, res) => {
        News.find({}, (err, news) => {
            if(err) {
                res.json({ success: false, message: err });
            } else {
                if(!news) {
                    res.json({ success: false, message: 'No news articles found' });
                } else {
                    res.json({ success: true, news: news });
                }
            }
        }).sort({ 'date': -1 });
    });

    /** UPDATE NEWS ARTICLE **/
    router.put('/updateNews', (req, res) => {
        if(!req.body._id) {
            res.json({ success: false, message: 'No news article ID was provided' });
        } else {
            News.findOne({ _id: req.body._id}, (err, news) => {
                if(err) {
                    res.json({ success: false, message: 'Not a valid news ID' });
                } else {
                    if(!news) {
                        res.json({ success: false, message: 'News ID was not found' });
                    } else {
                        news.title = req.body.title;
                        news.date = req.body.date;
                        news.snippet = req.body.snippet;
                        news.url = req.body.url;
                        news.save((err) => {
                            if(err) {
                                if(err.errors) {
                                    res.json({ success: false, message: 'Please ensure that this form is filled out correctly' });
                                } else {
                                    res.json({ success: false, message: err });
                                }
                            } else {
                                res.json({ success: true, message: 'News article has been updated' });
                            }
                        });
                    }
                }
            });
        }
    });

    /** GET SINGLE NEWS ARTICLE **/
    router.get('/singleNews/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No news ID was provided' });
        } else {
            News.findOne({ _id: req.params.id }, (err, news) => {
                if(err) {
                    res.json({ success: false, message: 'Not a valid news ID' });
                } else {
                    if(!news) {
                        res.json({ success: false, message: 'News Article not found' });
                    } else {
                        res.json({ success: true, news: news });
                    }
                }
            });
        }
    });

    /** DELETE NEWS ARTICLE **/
    router.delete('/deleteNews/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No ID was provided' });
        } else {
            News.findOne({ _id: req.params.id}, (err, news) => {
                if(err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if(!news) {
                        res.json({ success: false, message: 'News article was not found' });
                    } else {
                        news.remove((err) => {
                            if(err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'News article deleted' });
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};
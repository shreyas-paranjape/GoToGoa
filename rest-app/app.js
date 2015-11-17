var express = require('express');
var bodyParser = require('body-parser');
//name of the js file to have access to
var trip = require('./trip');
var acti = require('./activity');

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function (req, res, next) {
    console.log('%s %s', req.method, req.path);
    next();
});

router.use(bodyParser.json());

//instead of app.get we use router.route and strt applying our routes and also apply multiple actions to a single route
router.route('/trips/:id')
    .put()
    .get(function (req, res, next) {
        res.json(trip.getById(req.params.id));
        next();
    })
    .delete();

//url
router.route('/trips')
    .post(function (req, res, next) {
        res.json(trip.save(req.body));
        next();
    })
    .get(function (req, res, next) {
        res.json(trip.getAll());
        next();
    });

router.route('/activities/:id')
    .put()
    .get(function (req, res, next) {
        res.json(acti.getById(req.body));
        next();
    })
    .delete();

router.route('/activities')
    .post(function (req, res, next) {
        res.json(acti.save(req.body));
        next();
    })
    .get(function (req, res, next) {
        res.json(acti.getAll());
        next();
    });
//default route set
app.use('/api', router);


app.listen(port);

console.log('Server listening on port ' + port);

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'routes/auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Announce = require('./Announce');

// CREATES A NEW Announces
router.post('/', function (req, res) {
  Announce.create({
            createdBy : req.body.createdBy,
            assignTo : req.body.assignTo,
            content : req.body.content,
            votes : req.body.votes
        },
        function (err, announce) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(announce);
        });
});

// RETURNS ALL THE Announces IN THE DATABASE
router.get('/', function (req, res) {
  Announce.find({}, function (err, announces) {
        if (err) return res.status(500).send("There was a problem finding the Announces.");
        res.status(200).send(announces);
    });
});

// GETS A SINGLE Announces FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     Announce.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

// DELETES A Announces FROM THE DATABASE
// router.delete('/:id', function (req, res) {
//     Announce.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem deleting the user.");
//         res.status(200).send("User: "+ user.name +" was deleted.");
//     });
// });

// UPDATES A SINGLE Announces IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
// router.put('/:id', /* VerifyToken, */ function (req, res) {
//     Announce.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });


module.exports = router;

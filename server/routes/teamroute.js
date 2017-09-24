/** All team raoutes and API calls here */
var express = require('express');
const TEAM = require('../../raw/teaminfo.json');
const MATCH = require('../models/match.js');
var path = require('path');

router = express.Router();
router.get('/getAllTeam', function (req, res) {

      res.send(TEAM);

    
});
router.post('/findTeamDetails', function (req, res, next) {
  console.log("here findTeamDetails", req.body);

  MATCH.findTeamDetails(req.body, function (err, result) {
    if (result) {
      res.send(result);

    } else {
      console.log("Error");

      res.status(500).send('Internal error occurred--500');
    }
  });
});
module.exports = router;
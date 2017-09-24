/* *This file is for data modeling.
Use this file for functions that need DB query 
 */
var mongoose = require('mongoose');
var matchSchema = new mongoose.Schema({
    matchid: String,
    season: String,
    city: String,
    date: String,
    team1: String,
    team2: String,
    toss_winner: String,
    toss_decision: String,
    result: String,
    dl_applied: String,
    winner: String,
    win_by_runs: String,
    win_by_wickets: String,
    player_of_match: String,
    venue: String,
    umpire1: String,
    umpire2: String,
    umpire3: String
});

matchSchema.statics.findTeamDetails = function (team, callback) {
    console.log("team ",team)
    this.find({
        $and: [{
                'season': team.season
            },
            {
                $or: [{
                    'team1': team.name
                }, {
                    'team2': team.name
                }]
            }
        ]
    }, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }

    })
};

matchSchema.statics.findAllMatch = function (callback) {
    this.find({

    }, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }

    })
};
matchSchema.statics.editmatch = function (matchDetail, callback) {
    this.findOne({
        _id: matchDetail._id
    }, function (err, data) {
        if (!err) {
            //change here
            data.save(function (err) {
                if (err)
                    callback(err, null);
                else
                    callback(null, data);
            })

        } else {
            callback(err, null);
        }

    })
};

matchSchema.statics.saveMatch = function (matchDetail, callback) {
    this.create({
        matchid: matchDetail.id,
        season: matchDetail.season,
        city: matchDetail.city,
        date: matchDetail.date,
        team1: matchDetail.team1,
        team2: matchDetail.team2,
        toss_winner: matchDetail.toss_winner,
        toss_decision: matchDetail.toss_decision,
        result: matchDetail.result,
        dl_applied: matchDetail.dl_applied,
        winner: matchDetail.winner,
        win_by_runs: matchDetail.win_by_runs,
        win_by_wickets: matchDetail.win_by_wickets,
        player_of_match: matchDetail.player_of_match,
        venue: matchDetail.venue,
        umpire1: matchDetail.umpire1,
        umpire2: matchDetail.umpire2,
        umpire3: matchDetail.umpire3

    }, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });

};
matchSchema.statics.deleteMatch = function (matchId, callback) {
    console.log("deletematch id", matchId);
    this.findOne({
        _id: matchId

    }).remove().exec();
    callback(null, 'Deleted');

};

module.exports = mongoose.model('match', matchSchema);
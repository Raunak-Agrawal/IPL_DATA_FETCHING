const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
var db = mongoose.connection;

mongoose.connect("mongodb://localhost/ipl");
const port = process.env.PORT || 5000;
mongoose.connection.on("open", function() {
  console.log("mongodb is connected!!");
});

app.get("/matches", (req, res) => {
  db.collection("matches")
    .aggregate([
      { $group: { _id: "$season", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    .toArray()
    .then(
      result => {
        res.json({ result: result });
      },
      err => res.status(301).send()
    );
});

app.get("/matches2", (req, res) => {
  // (arr1 = []), (arr2 = []);
  // var query = { season: 2017 };
  db.collection("matches")
    .aggregate([
      { $unwind: "$winner" },
      {
        $group: {
          _id: "$winner",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])
    .toArray()
    .then(
      result2 => {
        res.json({ result2: result2 });
      },
      err => res.status(301).send()
    );
});
app.get("/deliveries1", (req, res) => {
  var year = [];
  var first, last;
  var team = [];

  db.collection("matches")
    .find({ season: 2016 })
    .toArray(function(err, result) {
      for (i = 0; i < result.length; i++) {
        year[i] = result[i].id;
      }
      first = year[0];
      last = year[year.length - 1];

      console.log(year);
      db.collection("deliveries")
        .aggregate([
          {
            $match: {
              match_id: { $lt: last },
              $and: [{ match_id: { $gt: first } }]
            }
          },
          {
            $group: {
              _id: { batting_team: "$batting_team" },
              count: { $sum: "$extra_runs" }
            }
          }
        ])
        .toArray()

        // for (i = 0; i < result1.length; i++) {
        //   team[i] = result1[i].batting_team;
        // }
        // res.json(result1);
        .then(result2 => {
          res.json({ result2: result2 });
        });
    });
});

app.get("/deliveries2", (req, res) => {
  var year = [];
  var first, last;
  var team = [];

  db.collection("matches")
    .find({ season: 2015 })
    .toArray(function(err, result) {
      for (i = 0; i < result.length; i++) {
        year[i] = result[i].id;
      }
      first = year[0];
      last = year[year.length - 1];

      console.log(year);
      db.collection("deliveries")
        .aggregate([
          {
            $match: {
              match_id: { $lt: last },
              $and: [{ match_id: { $gt: first } }]
            }
          },
          {
            $group: {
              _id: { bowler: "$bowler" },
              count: { $sum: "$total_runs" }
            }
          },
          { $sort: { count: 1 } },
          { $limit: 5 }
        ])
        .toArray()
        .then(result2 => {
          res.json({ result2: result2 });
        });
    });
});
app.get("/matches3", (req, res) => {
  // (arr1 = []), (arr2 = []);
  // var query = { season: 2017 };
  db.collection("matches")
    .aggregate([
      { $unwind: "$player_of_match" },
      {
        $group: {
          _id: "$player_of_match",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
    .toArray()
    .then(
      result2 => {
        res.json({ result2: result2 });
      },
      err => res.status(301).send()
    );
});
app.listen(port, () => console.log(`Listening on port ${port}`));

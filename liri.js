var keys = require("./keys.js");

var task = process.argv[2];
var search = process.argv[3];

function twitterSearch() {
  var Twitter = require("twitter");

  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {screen_name:"NSSTADC"};
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(tweets);
    }
  });
}

function spotifySearch() {
  var Spotify = require("node-spotify-api");

  var spotify = new Spotify({
    id: "453ddfa134094071a9b988a2a71ae2a2",
    secret: "43de231a1a374bab8f7e03b2b2f9f22b"
  });

  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song name: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

function imdbSearch() {
  var request = require("request");

  request(
    "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Movie title: " + JSON.parse(body).Title);
        console.log("Release year: " + JSON.parse(body).Year);
        console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Plot: " + JSON.parse(body).Plot);
      }
    }
  );
}

function random() {
  var fs = require("fs");
  fs.readFile('random.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
}

if (task === "my-tweets") {
  twitterSearch();
}

if (task === "spotify-this-song") {
  spotifySearch();
}

if (task === "movie-this") {
  imdbSearch();
}

if (task === "do-what-it-says") {
  random();
}


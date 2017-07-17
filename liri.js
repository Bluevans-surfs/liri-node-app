var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var client = new twitter({
  consumer_key: keys.twitterkeys.consumer_key,
  consumer_secret: keys.twitterkeys.consumer_secret,
  access_token_key: keys.twitterkeys.access_token_key,
  access_token_secret: keys.twitterkeys.access_token_secret,
});


var spotify = new Spotify({
  id: keys.spotifykeys.id,
  secret: keys.spotifykeys.secret,
});


var command = process.argv[2];
var qTitle = process.argv.slice(3).join(" ");

if (command === "my-tweets") {
	 gettweets();
} 

if (command === "spotify-this-song") {
	 if (qTitle) {

	 	getspotify(qTitle);

	 } else {

	 	getspotify("The Sign Ace of Base");

	 }
} 

function gettweets() {

	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    
	    for (var i = 0; i < 20; i++) {

	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	console.log("");

	    }
	  }

	});

  }

function getspotify(song) {

	spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);

  }
	    var trackList = data.tracks.items;

	    for (var i = 0; i < trackList.length; i++) {

	    	console.log("Artist: " + trackList[i].artists[0].name);
	    	console.log("Song Title: " +trackList[i].name);
	    	console.log("Preview: " +trackList[i].preview_url);
	    	console.log("Album: " +trackList[i].album.name);
	    	console.log("");
	}
	    
  });

}

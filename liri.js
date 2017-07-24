var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");
var fs= require("fs");

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

				fs.readFile('./random.txt', 'utf8',function(err,data){

					if(err){
						console.log(err);
					} else
					{
						getspotify(data);
					}

		
});
	 

	 }
	}

if (command === "my-movie") {
	  if (qTitle) {

	 	getMovie(qTitle);

} else {

	getMovie("As Good as it Gets");
 }
}


function gettweets() {

	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    
	    for (var i = 0; i < 20; i++) {

	    	console.log("----------------------------------------------------------------------------------------------------------------------------")
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	console.log("----------------------------------------------------------------------------------------------------------------------------")
	    	console.log("");
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

	    	console.log("----------------------------------------------------------------------------------------------------------------------------")
	    	console.log("Artist: " + trackList[i].artists[0].name);
	    	console.log("Song Title: " +trackList[i].name);
	    	console.log("Preview: " +trackList[i].preview_url);
	    	console.log("Album: " +trackList[i].album.name);
	    	console.log("----------------------------------------------------------------------------------------------------------------------------")
	    	console.log("");
	    	console.log("");
	}
	    
  });

}

var request = require('request');

function getMovie(movie) {

  
	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&tomatoes=true&apikey=40e9cece', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred 
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  // console.log('body:', body); // Print the HTML for the Google homepage. 
  var bodyresponse = JSON.parse(body);
  console.log("");
  console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------")
  console.log("");
  console.log('Title: ' + bodyresponse['Title']);
  console.log('Year: ' + bodyresponse['Year']);
  console.log('Rating: ' + bodyresponse['imdbRating']);
  console.log('Ratings: ' + bodyresponse['Ratings'][1]['Value']);
  console.log('Country: ' + bodyresponse['Country']);
  console.log('Language: ' + bodyresponse['Language']);
  console.log('Plot: ' + bodyresponse['Plot']);
  console.log('Actors: ' + bodyresponse['Actors']);
  console.log("");
  console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------")
  console.log("");






});

}



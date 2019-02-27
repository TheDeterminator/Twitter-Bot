const express = require('express');
const Twitter = require('twitter');
const server = express()
const PORT = process.env.PORT || 8000

server.use(express.json())

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

var params = {screen_name: 'nodejs'};

var eyeD = 'hello'

// sendTweet = (message) => {
//     // console.log(eyeD)
//     client.post('statuses/update', {status: message},  async function(error, tweet, response) {
//     // if(error) throw error;
//     // console.log('kkkk' + eyeD); defined!!
//     await response
//     try {
//         response = JSON.parse(response.body)
//         console.log(response.id_str);  // Raw response object.
//         eyeD = response.id
//     } catch {
//         if (error) throw error;
//     }
    
//   })
// };

sendTweet = (message) => {
    // console.log(eyeD)
    client.post('statuses/update', {status: message})
    .then(function(tweet) {
        console.log(tweet)
    })
    .catch(function(error) {
        console.log(error)
    })
};

function deleteTweet(id) { client.post(`statuses/destroy/${id}.json`,  function(error, tweet, response) {
    if(error) throw error;
    console.log(`deleted`)
  })
};

delete20Tweets = (s_name) => {
    client.get('statuses/user_timeline.json', {screen_name: s_name})
    .then(tweets => {
        tweets.map(tweet => {
            // console.log(`{${tweet.id_str}, ${tweet.text}}`)
            deleteTweet(tweet.id_str)
        })
        
    })
    .catch(error => {
        if(error) throw error;
    });
}

// sendTweet('this is 20')

// getTweets()

server.listen(PORT, function() {console.log(`Server is listening on port ${PORT}`)})



// var qs = require('querystring'),
// oauth =
//     { 
//      consumer_key: CONSUMER_KEY
//     , consumer_secret: CONSUMER_SECRET
//     },
//     url = 'https://api.twitter.com/oauth/request_token';

// request.post({url:url, oauth:oauth}, function (e, r, body) {
//     var req_data = qs.parse(body)
//     var uri = 'https://api.twitter.com/oauth/authenticate'
//     + '?' + qs.stringify({oauth_token: req_data.oauth_token})
//       // redirect the user to the authorize uri
//     // after the user is redirected back to your server
//     var auth_data = qs.parse(body)
//     , oauth =
//       { consumer_key: CONSUMER_KEY
//       , consumer_secret: CONSUMER_SECRET
//       , token: auth_data.oauth_token
//       , token_secret: req_data.oauth_token_secret
//       , verifier: auth_data.oauth_verifier
//       }
//     , url = 'https://api.twitter.com/oauth/access_token'
//     ;
//     request.post({url:url, oauth:oauth}, function (e, r, body) {
//         // ready to make signed requests on behalf of the user
//         var perm_data = qs.parse(body)
//           , oauth =
//             { consumer_key: CONSUMER_KEY
//             , consumer_secret: CONSUMER_SECRET
//             , token: perm_data.oauth_token
//             , token_secret: perm_data.oauth_token_secret
//             }
//           , url = 'https://api.twitter.com/1.1/statuses/update.json'
//         //   , qs =
//         //     { screen_name: perm_data.screen_name
//         //     , user_id: perm_data.user_id
//         //     }
//           ;
//         request.post({url:url, oauth:oauth, qs:qs, json:true, status: "test 3"}, function (e, r, body) {
//           console.log('AAAAAAAAA' + e);
//         //   console.log(r);
//           console.log('CCCC ' + body)
//         })
//         console.log('EEEEE' + body)
//       })
//       console.log('RRRRRR ' + body); 
//     })


// request('https://api.twitter.com/1.1/statuses/update.json', {method: "POST", status: "Tweet test 3"}, function(error, response, body) {
//     console.log(error)
//     console.log(response)
//     console.log(body)
// })
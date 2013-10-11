stocktwits
==========

```bash
$ npm install stocktwits
$ npm test
```


##GET

Accepts API string, query string params (optional) and a callback.

```js
var st = require('stocktwits');

// without additional parameters
st.get('streams/user/StockTwits', function (err, res) {
    console.log(res.body);
});

// pass optional parameters
st.get('streams/user/StockTwits', {limit:15, filter:'links'}, function (err, res) {
    console.log(res.body);
});

// for requests that require authentication
st.get('streams/friends', {access_token:'token', filter:'charts'}, function (err, res) {
    console.log(res.body);
});
```
Note that some parameters are appended to the API string! Refer to the StockTwits documentation.


##POST

Accepts API string, query string params, POST data and a callback.

```js
// the access token is required for all POST requests
st.post('messages/create', {access_token:'token'}, {body:'message'}, function (err, res) {
    console.log(res.body);
});
```

##RESPONSE

###err

`err` is one of:
- network error
- generic error from StockTwits (usually html page)
- API error (JSON error response)

###res

`res` is a generic nodejs response object extended with:
- **body** - parsed JSON response from the server
- **raw** - the response as string
- **limit** - the API limit for this type of request
- **remainig** - remaining request for this time window
- **reset** - rate limit reset date

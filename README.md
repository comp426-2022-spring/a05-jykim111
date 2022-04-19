[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7652644&assignment_repo_type=AssignmentRepo)
# a05 Human Interface

In this assignment, you will build an HTML human interface for your API. You will also document your API endpoints and consider package structure.

## DO NOT CLONE THIS REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/PUVGxeMe

If you clone this repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it.

## Instructions

Full instructions for this assignment are available at: https://comp426.johndmart.in/a/05/

<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)
   * Retrieve data from the server.
   * If the connection to API is open, the message below will appear in terminal.  
   * If not, it will indicate curl has failed to connect to `port 5000`.  

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)
   * Retrieve data from the server.
   * One coin flip that returns a randomized selection of either heads or tails.

#### Request cURL

```
curl http://localhost:5000/app/flip
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-N9e0DDykqBPnqphc8f4bzHcjsuM"
Date: Tue, 19 Apr 2022 09:38:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)
   * Retrieve data from the server.
   * Given a number of flips, it returns the total number of flips 
   entered with either heads or tails at random.
   * `raw` : raw result listing of all flips.
   * `summary` : JSON displaying the total number of tails and heads for the given parameter.

#### Request cURL

```
curl http://localhost:5000/app/flips/3/
```

#### Response body

```
{"raw":["heads","tails","heads"],"summary":{"tails":1,"heads":2}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 65
ETag: W/"41-lRUeqOPgUIUCIpLSg9Rg2NhRshg"
Date: Tue, 19 Apr 2022 09:40:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)
   * Retrieve data from the server.
   * Same API call as `/app/flip/ (GET)`.
   * Flip one coin and return either heads or tails at random.

#### Request cURL

```
curl http://localhost:5000/app/flip/coin/
```

#### Response body

```
{"flip":"tails"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-N9e0DDykqBPnqphc8f4bzHcjsuM"
Date: Tue, 19 Apr 2022 09:42:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)
   * Request data from the server with a given guess and obtain:
      1. "call" (guess) : (heads | tails)
      2. "flip" (actual flip) : (heads | tails)
      3. "result" (match) : (win | lose)

#### Request cURL

```
curl http://localhost:5000/app/flip/call/tails/
```

#### Response body

```
{"call":"tails","flip":"heads","result":"lose"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-dW3ed8gY96gkWWRLhNdjW7lPbec"
Date: Tue, 19 Apr 2022 09:44:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)
   * Sends data/information to the server through curl with a guess.
   * Returns back :
      1. "call" (guess) : (heads | tails)
      2. "flip" (actual flip) : (heads | tails)
      3. "result" (match) : (win | lose)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)
   * Sends data/information to the server.
   * Request the number of flips and obtain:
      * `raw` : raw result listing of all flips.
      * `summary` : JSON displaying the total number of tails and heads for the given parameter.


#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)
** only works when --debug = true (Running `npm test`) **
   * Retrieve data from the server.
   * Obtains all records of access log.

#### Request cURL

```
curl http://localhost:5000/app/log/access
```

#### Response body

```
[{"id":1,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1650360968407.0","method":"GET","url":"/app/flip","protocol":"http","httpversion":"1.1","status":"200.0","referer":null,"useragent":null},{"id":2,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1650361070839.0","method":"GET","url":"/app/flip","protocol":"http","httpversion":"1.1","status":"200.0","referer":null,"useragent":null}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 3137
ETag: W/"c41-sQcnEuXqH9OR8gp/xzT1G4gup7g"
Date: Tue, 19 Apr 2022 13:21:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/error/ (GET)
** only works when --debug = true (Running `npm test`) **
   * Retrieve data from the server.
   * Returns an error message (_Error test successful_)

#### Request cURL

```
curl http://localhost:5000/app/error/
```

#### Response body

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Error test successful.<br> &nbsp; &nbsp;at /Users/jameskim/Documents/unc/comp426/a05-jykim111/src/routes/debug_route.js:27:11<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/index.js:281:22<br> &nbsp; &nbsp;at Function.process_params (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/index.js:341:12)<br> &nbsp; &nbsp;at next (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/index.js:275:10)<br> &nbsp; &nbsp;at Function.handle (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/index.js:174:3)<br> &nbsp; &nbsp;at router (/Users/jameskim/Documents/unc/comp426/a05-jykim111/node_modules/express/lib/router/index.js:47:12)</pre>
</body>
</html>
```

#### Response headers

```
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1477
Date: Tue, 19 Apr 2022 13:28:16 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)
** Will only work when --debug = true (Running `npm test`) since it's a log **
   * Retrieve data from the server.
   * Returns back log errors from the file.

_Not yet implemented_

#### Request cURL

```
curl http://localhost:5000/app/log/error/
```

#### Response body

```
[{"id":1,"remoteaddr":"::null","remoteuser":null,"time":"1650360968407.0","method":"GET","url":"/endpoint/does/not/exist","protocol":"http","httpversion":"1.1","status":"404.0","referer":null,"useragent":null}]
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 13
ETag: W/"d-9cDc1x9S0CgmdX/8mukTB8yQ/hY"
Date: Tue, 19 Apr 2022 13:35:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)
* Sends data/information to the server.
   * Allows the specified user to login
   * It must provide login and password.
   * Returns username and login success or fail.

_Not yet implemented_

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"username":"my_username", "password":"my_password"}' http://localhost:5000/app/user/login/
```

#### Response body

```
{"username":"my_username", "success":"true"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 3137
ETag: W/"c41-sQcnEuXqH9OR8gp/xzT1G4gup7g"
Date: Tue, 19 Apr 2022 13:21:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/new/ (POST)
* Sends data/information to the server.
   * Allows new user to be added to the database.
   * Returns the new user's username and login success or fail.

_Not yet implemented_

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"username":"new_user_login", "password":"new_user_password"}' http://localhost:5000/app/user/new/
```

#### Response body

```
{"username":"new_username", "success":"true"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 3137
ETag: W/"c41-sQcnEuXqH9OR8gp/xzT1G4gup7g"
Date: Tue, 19 Apr 2022 13:21:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/update/ (PATCH)
* PATCH sends an object containing partial data and rules for applying this data to an existing resource identified by its URI

* Modify an existing data that is already in the server.
   * Allows registered users to update their information.
   * Returns back the updated information and success or fail.

_Not yet implemented_

#### Request cURL

```
curl -X PATCH -H 'Content-Type: application/json' -d {username":"update_username", "password":"update_password"}' http://localhost:5000/app/user/update/
```

#### Response body

```
{"username":"updated_username", "password":"updated", "updates":"successful"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 3137
ETag: W/"c41-sQcnEuXqH9OR8gp/xzT1G4gup7g"
Date: Tue, 19 Apr 2022 13:21:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete/ (DELETE)
* DELETE asks the server to delete the resource specified in the Request-URI
* Deletes a user from the server.
* Need to be careful when doing this as it cannot be done by a mistake.
* Returns successful deletion.

_Not yet implemented_

#### Request cURL

```
curl -X DELETE -H 'Content-Type: application/json' -d {"username":"my_username", "password":"my_password", "password":"verify_password"}' http://localhost:5000/app/user/delete/
```

#### Response body

```
{"username":"my_username", "deletion":"successful"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 3137
ETag: W/"c41-sQcnEuXqH9OR8gp/xzT1G4gup7g"
Date: Tue, 19 Apr 2022 13:21:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

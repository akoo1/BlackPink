
// To import the HTTP library to the variable, to start the server
const http = require('http')  // import http from "http"  This is the newer method to import a library in node.js

// This variable tells our server what port to listen to
const port = 6969

// This creates a server
const server = http.createServer(function (req, res) {
    res.write('Respond: Hello Node')
    res.end()
})


// To start the server, type "node application.js" in the terminal
server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error)
    }
    else {
        console.log('Server is listening on port ' + port)
    }
})


// Now your computer is serving (hosting) the node.js application on this particular URL
// http://127.0.0.1:6969/
// Seems like the port number could be any 4-digit number lol
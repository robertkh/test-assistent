const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
// app.get("/api/install", (req, res) => {
// 	console.log("api/install");
// 	res.send("hi, it is install");
// });

// app.get("/api/delete", (req, res) => {
// 	console.log("api/del");
// 	res.send("hi, it is delet");
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

// app.get("*", (req, res) => {
// 	res.send("hi, it is unknown endpoint");
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Assistent listening on ${port}`);

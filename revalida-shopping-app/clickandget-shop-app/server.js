const express = require('express');
var path = require('path');
const port = process.env.PORT || 3100;
const app = express();

// Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'dist/revalida-shopping-app/browser')));

// Any routes will be redirected to the angular app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/revalida-shopping-app/browser/index.html'));
});

// starting server on port 8081
app.listen(port, () => {
    console.log("Server started on port " + port);
});
/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var favicon = require('./lib/favicon');
var express = require('express');
var app     = express();

app.get('/favicon.ico', favicon);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on', port);
});

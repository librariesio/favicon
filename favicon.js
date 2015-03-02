/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var Canvas  = require('canvas');
var colours = require('./colours.json');

var favicon = function(req, res) {

  var label = 'L';
  var lang  = req.query.lang;

  var WIDTH   = 16;
  var HEIGHT  = 16;

  var canvas = new Canvas(WIDTH, HEIGHT);

  var ctx = canvas.getContext('2d');
  ctx.fillStyle     = "white";
  ctx.textBaseline  = 'middle';
  ctx.font          = '9pt sans-serif';
  
  // Label
  ctx.fillStyle = colours[lang];
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Round corners 
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1, 1);           // top left
  ctx.fillRect(0, HEIGHT - 1, 1, 1);  // bottom left
  ctx.fillRect(WIDTH - 1, 0, 1, 1);   // top right
  ctx.fillRect(WIDTH - 1, HEIGHT - 1, 1, 1);  // bottom right

  // Insert text
  ctx.shadowColor   = "#333";
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur    = 0;
  ctx.fillText(label, 5, 9);

  // Generate PNG
  var stream = canvas.createPNGStream();

  res.setHeader('Cache-Control','public, max-age=31536000');
  res.setHeader('Content-Type', 'image/x-icon');

  stream.pipe(res);
};

module.exports = favicon;

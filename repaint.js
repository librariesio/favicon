/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var Canvas  = require('canvas');
var colours = require('./colours.json');
var fs      = require('fs');

function hexToRgb(hex) {
  var match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  var rgb = {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16)
  };
  return rgb;
}

var repaint = function(req, res) {
  var lang = req.query.lang;
  var colour = colours[lang];

  if (!colour) return res.end();

  fs.readFile(__dirname + '/favicon-16x16.png', function(err, data) {
    if (err) throw err;

    var img = new Canvas.Image; // Create a new Image
    img.src = data;

    var canvas = new Canvas(16,16);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 16, 16);

    var imageData = ctx.getImageData(0, 0, 16, 16);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      data[i]     = hexToRgb(colour).r;
      data[i + 1] = hexToRgb(colour).g;
      data[i + 2] = hexToRgb(colour).b;
    }

    ctx.putImageData(imageData, 0, 0);

    var stream = canvas.createPNGStream();

    res.setHeader('Cache-Control','public, max-age=31536000');
    res.setHeader('Content-Type', 'image/x-icon');

    stream.pipe(res);
  });
};

module.exports = repaint;

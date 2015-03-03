/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var Canvas  = require('canvas');
var colours = require('./colours.json');
var fs      = require('fs');
var uuid    = require('uuid');

var HEXREGEXP = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
var SUPPORTED_SIZES = [16,32,96,128,196];

function hexToRgb(hex) {
  var match = hex.match(HEXREGEXP);
  if (!match) return null;
  var rgb = {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16)
  };
  return rgb;
}

var repaint = function(req, res) {
  var _size = parseInt(req.query.size);
  var size  = (SUPPORTED_SIZES.indexOf(_size) !== -1) ? _size : 16;

  var hex  = req.query.hex;
  var lang = req.query.lang;
  var colour = hex && hex.match(HEXREGEXP) ? hex : colours[lang] || '252525';

  var faviconPath = __dirname +'/favicons/favicon-'+ size +'.png';
  fs.readFile(faviconPath, function(err, data) {
    if (err) throw err;

    var img = new Canvas.Image;
    img.src = data;

    var canvas = new Canvas(size, size);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);

    var imageData = ctx.getImageData(0, 0, size, size);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      data[i]     = hexToRgb(colour).r;
      data[i + 1] = hexToRgb(colour).g;
      data[i + 2] = hexToRgb(colour).b;
    }

    ctx.putImageData(imageData, 0, 0);

    var stream = canvas.createPNGStream();

    res.setHeader('ETag', uuid.v1());
    res.setHeader('Cache-Control','max-age=0, no-cache, no-store');
    res.setHeader('Content-Type', 'image/x-icon');

    stream.pipe(res);
  });
};

module.exports = repaint;

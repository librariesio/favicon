# Faviconz

  Generate favicons that follow the GitHub language colour code.

## Usage

 -  `http://localhost:5000/favicon.ico?lang=Ruby`

## Installation

 - `brew install cairo`
 - `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig`
 - `npm install`

## Deployment to Heroku

  Deploymento to Heroku requires using `heroku-buildpack-multi` and the buildpacks specified in `.buildpack` and it only works with `node-canvas` `1.1.6` (on `1.2.1` there's an issue with `pangocairo`): https://github.com/Automattic/node-canvas/wiki/Installation-on-Heroku#using-a-custom-build-pack
  

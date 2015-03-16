# Libraries.io Favicons

  Generate favicons that follow the GitHub language colour code.

## Usage

 Available query parameters are:

 - `size`: 16, 32, 96, 128 or 196
 - `hex`: hex colour code, eg: #252525
 - `lang`: a valid language, check `lib/colours.json`

 Example:

 - `http://localhost:5000/favicon.ico?size=128&lang=Ruby`

## Dependencies

 - `brew install cairo`
 - `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig`
 - `npm install`

## Running it

  `npm start`

## Deployment to Heroku

  Deployment to Heroku requires using `heroku-buildpack-multi` and the buildpacks specified in `.buildpack` and it only works with `node-canvas` `1.1.6` (on `1.2.1` there's an issue with `pangocairo`): https://github.com/Automattic/node-canvas/wiki/Installation-on-Heroku#using-a-custom-build-pack
  

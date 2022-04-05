'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
 
  // production mode
  mode: "production",

  // input file
  entry: "./src/index.js",

  // output file
  output: {

      // file name
      filename: "bundle.js",

      // complete path
      path: __dirname
  }
}


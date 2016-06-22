const webpack = require('webpack')
    , path    = require('path')
    , fs      = require('fs')

const externals = {}
fs.readdirSync('node_modules')
  .filter(folder => ['.bin'].indexOf(folder) === -1)
  .forEach(name => externals[name] = `commonjs ${name}`)

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  target: 'node',
  module: {
    loaders: [{
      loader: 'babel',
      include: [
        path.resolve(__dirname, 'index.js'),
        path.resolve(__dirname, 'lib'),
      ],
      test: /\.js$/,
      query: {
        plugins: [
          [
            'extensible-destructuring',
            { mode: 'optout', impl: 'immutable' }
          ],
          'syntax-async-functions',
          'transform-regenerator',
          'transform-runtime'
        ],
        presets: ['es2015', 'stage-0']
      },
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ]
    }]
  },
  externals: externals,
  devtool: 'sourcemap'
}

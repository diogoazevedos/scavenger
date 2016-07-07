const { resolve } = require('path'),
      { readdirSync } = require('fs')

const externals = {}
readdirSync('node_modules')
  .filter(folder => ['.bin'].indexOf(folder) === -1)
  .forEach(name => externals[name] = `commonjs ${name}`)

module.exports = {
  entry: resolve(__dirname, 'index.js'),
  output: {
    path: resolve(__dirname, 'build'),
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
        resolve(__dirname, 'index.js'),
        resolve(__dirname, 'lib'),
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
        resolve(__dirname, 'node_modules')
      ]
    }]
  },
  externals: externals,
  devtool: 'sourcemap'
}

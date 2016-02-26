const path         = require('path')
    , phantomjs    = require('phantomjs')
    , childProcess = require('child_process')

module.exports = (source) => {
  const childArgs = [
      '--load-images=false'
    , path.resolve(__dirname, 'render.js')
    , source
  ]

  const childOpts = {
    maxBuffer: 1024 * 1024
  }

  return new Promise((resolve, reject) => {
    const binPath = phantomjs.path
    childProcess.execFile(binPath, childArgs, childOpts, function (error, stdout, stderr) {
      if (error) reject(stderr)

      const response = {
        status: parseInt(stdout.substring(0, 3)),
        data:            stdout.substring(3)
      }

      resolve(response)
    })
  })
}

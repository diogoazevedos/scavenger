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

      let status = stdout.substring(0, 3)
      const data = stdout.substring(3)

      status = parseInt(status)

      if (status === 200) {
        resolve({ data: data, status: status })
      } else {
        reject({  data: data, status: status })
      }
    })
  })
}

import { resolve as solve } from 'path'
import { execFile } from 'child_process'
import { path } from 'phantomjs-prebuilt'

export default (source) => {
  const args = [ '--load-images=false', solve(__dirname, 'render.js'), source ]
  const opts = { maxBuffer: 1024 * 1024 }

  return new Promise((resolve, reject) => {
    execFile(path, args, opts, function (e, stdout, stderr) {
      if (e) reject(stderr)

      const status = parseInt(stdout.substring(0, 3))
      const response = { status, data: stdout.substring(3) }

      if (status === 200) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

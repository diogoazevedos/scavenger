import axios from 'axios'
import phantom from './phantom'

export default (source, render) => {
  if (render) return phantom(source)

  return axios.get(source)
}

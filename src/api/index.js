const _axios = require('axios')

const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER
const REACT_APP_PORT = process.env.REACT_APP_PORT

// API Setting
const BASE_URL = `http://${REACT_APP_API_SERVER}:${REACT_APP_PORT}/api`

const axios = _axios.create({
  baseURL: BASE_URL,
})

/**
 * @param { String } route Used as a main entry point for api caller.
 */
async function api (url, method = 'GET', data = {}) {
  // Get Data
  let response = null
  if (method === 'GET') {
    response = await axios({ method: 'get', url })
  } else if (method === 'POST') {
    response = await axios({ method: 'post', url, data })
  }

  return response
}

export { api, BASE_URL }

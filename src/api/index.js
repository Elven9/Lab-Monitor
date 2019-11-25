const _axios = require('axios')

// API Setting
const BASE_URL = 'https://need-to-change.com.tw'

const axios = _axios({
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
    response = await axios({ method: 'get', url, data })
  }

  return response
}

export { api, BASE_URL }

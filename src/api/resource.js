// const api = require('./index').api
const mockEntry = require('./mockEntry')

exports.getResourceUsage = (data) => {
  // return api('/resource/usage', method="POST", data)
  return mockEntry.getResourceUsage(data)
}

exports.getResourceAllocation = (data) => {
  // return api('/resource/allocation', method="POST", data)
  return mockEntry.getResourceAllocation(data)
}

// const api = require('./index').api
const mockEntry = require('./mockEntry')

exports.getHardwareSpec = () => {
  // return api('/system/hardwareSpec')
  return mockEntry.getHardwareSpec()
}

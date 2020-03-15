const api = require('./index').api
const mockEntry = require('./mockEntry')

exports.getHardwareSpec = () => {
  return api('/system/hardwareSpec')
  // return mockEntry.getHardwareSpec()
}

exports.getGroupInfo = (groupName) => {
  // return api('/system/groupInfo', method="POST", data= { group_name: groupName })
  return mockEntry.getGroupInfo()
}

exports.getUserInfo = (userName) => {
  // return api('/system/userInfo', method="POST", data= { user_name: userName })
  return mockEntry.getUserInfo()
}

exports.getQueueStatistics = () => {
  // return api('/queue/statistic')
  return mockEntry.getQueueStatistics()
}

exports.getInteractiveQueue = () => {
  // return api('/queue/interactive')
  return mockEntry.getInteractiveQueue()
}

exports.getTrainQueue = () => {
  // return api('/queue/train')
  return mockEntry.getTrainQueue()
}

exports.getServiceQueue = () => {
  // return api('/queue/service')
  return mockEntry.getServiceQueue()
}

exports.getJobs = () => {
  return api('/job/getJobs')
  // return mockEntry.getJobs()
}

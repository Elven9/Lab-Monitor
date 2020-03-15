const Mock = require('mockjs')
Mock.Random.extend({
  intarray: (limit = 6) => {
    let result = []
    for (let i = 0; i < limit; i++) {
      result.push(Mock.Random.integer(0, 10))
    }

    return result
  },
})

exports.getHardwareSpec = () => {
  // Return Hardware Spec
  return Mock.mock({
    'data|4': [{
      'node_type|1-10': '*',
      'node_count|1-10': 1,
      'cpu_type|1': [
        'i3-9100【4核/4緒】3.6GHz(↑4.20GHz)/6M/UHD630/65W',
        'i5-9400【6核/6緒】2.9GHz(↑4.10GHz)/9M/UHD630/65W',
        'i7-9700【8核/8緒】3.0GHz(↑4.7GHz)/12M/UHD630/65W',
        'R3 3200G【4核/4緒】3.6G(↑4.0G)65W/6M/12nm/Vega 8 內顯',
        'R5 3400G【4核/8緒】3.7G(↑4.2G)65W/6M/12nm/Vega 11內顯',
        'R7 3700X【8核/16緒】3.6G(↑4.4G)65W/36M/7nm/PCIe4.0 無內顯',
      ],
      'cpu_capacity|1-10': 1,
      'cpu_count|1-4': 1,
      'memory_size|1': ['1 GB', '2 GB', '4 GB', '8 GB', '16 GB', '32 GB'],
      'gpu_type|1': [
        'NVIDIA® Tesla® T4',
        'NVIDIA® Tesla® V100',
        'NVIDIA® Tesla® P100',
        'NVIDIA® Tesla® P4',
        'NVIDIA® Tesla® K80',
      ],
      'gpu_capacity|1-10': 1,
      'gpu_count|1-4': 1,
      'gpu_memory_size|1': ['1 GB', '2 GB', '4 GB', '8 GB', '16 GB', '32 GB'],
    }],
  })
}

exports.getGroupInfo = () => {
  return Mock.mock({
    'data|4': [
      {
        'node_type|1-10': '*',
        'node_count|1-10': 1,
        'cpu_usage|0-100': 1,
        'host_memory_usage|0-100': 1,
        'gpu_usage|0-100': 1,
        'gpu_memory_usage|0-100': 1,
      },
    ],
  })
}

exports.getUserInfo = () => {
  return Mock.mock({
    'data|4': [
      {
        'node_type|1-10': '*',
        'cpu_usage|0-100': 1,
        'host_memory_usage|0-100': 1,
        'gpu_usage|0-100': 1,
        'gpu_memory_usage|0-100': 1,
      },
    ],
  })
}

exports.getResourceUsage = (payload) => {
  let mockPayload = []

  // Prepare CPU
  if (payload.resource.indexOf(0) !== -1) {
    for (let i = 0; i < payload.identifier.length; i++) {
      let load = {
        'resource': 0,
        'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
      }
      load[`data|${payload.resolution}`] = [
        {
          'usage|0-100': 1,
          timestamp: '@datetime',
        },
      ]
      mockPayload.push(load)
    }
  }

  // Prepare GPU
  if (payload.resource.indexOf(1) !== -1) {
    for (let i = 0; i < payload.identifier.length; i++) {
      let load = {
        'resource': 1,
        'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
      }
      load[`data|${payload.resolution}`] = [
        {
          'usage|0-100': 1,
          timestamp: '@datetime',
        },
      ]
      mockPayload.push(load)
    }
  }

  // Prepare Memory
  if (payload.resource.indexOf(2) !== -1) {
    for (let i = 0; i < payload.identifier.length; i++) {
      let load = {
        'resource': 2,
        'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
      }
      load[`data|${payload.resolution}`] = [
        {
          'usage|0-100': 1,
          timestamp: '@datetime',
        },
      ]
      mockPayload.push(load)
    }
  }

  return Mock.mock({
    'data': mockPayload,
  })
}

exports.getResourceAllocation = (payload) => {
  let mockPayload = []

  // Prepare CPU
  for (let i = 0; i < payload.identifier.length; i++) {
    let load = {
      'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
      'data|0-4': [
        {
          'nodeId': 'k8s-api-0',
          'podId|0-3': 1,
          'cpuUsage': '1 cores',
          'memUsage': '4 GB',
        },
      ],
    }
    mockPayload.push(load)
  }

  // // Prepare GPU
  // if (payload.resource.indexOf(1) !== -1) {
  //   for (let i = 0; i < payload.identifier.length; i++) {
  //     let load = {
  //       'resource': 1,
  //       'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
  //       'data|0-4': [
  //         {
  //           'jobId|0-10000': 1,
  //           'usage|0-100': 1,
  //           'location': {
  //             'nodeId|0': 1,
  //             'podId|0-3': 1,
  //           },
  //         },
  //       ],
  //     }
  //     mockPayload.push(load)
  //   }
  // }

  // // Prepare Memory
  // if (payload.resource.indexOf(2) !== -1) {
  //   for (let i = 0; i < payload.identifier.length; i++) {
  //     let load = {
  //       'resource': 2,
  //       'identifier': { type: payload.identifier[i].type, id: payload.identifier[i].id },
  //       'data|0-4': [
  //         {
  //           'jobId|0-10000': 1,
  //           'usage|0-100': 1,
  //           'location': {
  //             'nodeId|0': 1,
  //             'podId|0-3': 1,
  //           },
  //         },
  //       ],
  //     }
  //     mockPayload.push(load)
  //   }
  // }

  return Mock.mock({
    'data': mockPayload,
  })
}

exports.getQueueStatistics = () => {
  return Mock.mock({
    'data': {
      'interactive': '@INTARRAY',
      'train': '@INTARRAY',
      'service': '@INTARRAY',
      'time_info': [
        {
          'queue_type': 'Interactive',
          'avg_job_wait_time|0-1000': 1,
          'avg_queue_len|0-10.1-10': 1,
        },
        {
          'queue_type': 'Train',
          'avg_job_wait_time|0-1000': 1,
          'avg_queue_len|0-10.1-10': 1,
        },
        {
          'queue_type': 'Service',
          'avg_job_wait_time|0-1000': 1,
          'avg_queue_len|0-10.1-10': 1,
        },
      ],
    },
  })
}

exports.getInteractiveQueue = () => {
  return Mock.mock({
    'data|1-10': [
      {
        'submission_time': '@date',
        'group_id|0-1000': 1,
        'job_id|0-1000': 1,
        'user_id|0-1000': 1,
        'job_type|1': ['Interactive', 'Train', 'Service'],
        'yaml_link': 'https://fake-download-link.com.tw',
      },
    ],
  })
}

exports.getTrainQueue = () => {
  return Mock.mock({
    'data|1-10': [
      {
        'submission_time': '@date',
        'group_id|0-1000': 1,
        'job_id|0-1000': 1,
        'user_id|0-1000': 1,
        'job_type|1': ['Interactive', 'Train', 'Service'],
        'yaml_link': 'https://fake-download-link.com.tw',
      },
    ],
  })
}

exports.getServiceQueue = () => {
  return Mock.mock({
    'data|1-10': [
      {
        'submission_time': '@date',
        'group_id|0-1000': 1,
        'job_id|0-1000': 1,
        'user_id|0-1000': 1,
        'job_type|1': ['Interactive', 'Train', 'Service'],
        'yaml_link': 'https://fake-download-link.com.tw',
      },
    ],
  })
}

exports.getJobs = () => {
  return Mock.mock({
    'data|1-20': [
      {
        'submission_time': '@date',
        'group_id|0-1000': 1,
        'job_id|0-1000': 1,
        'user_id|0-1000': 1,
        'job_type|1': ['Interactive', 'Train', 'Service'],
        'yaml_link': 'https://fake-download-link.com.tw',
        'start_time': '@date',
        'end_time': '@date',
        'exe_time|1-10': 1,
        'wait_time|1-10': 1,
        'state|1': [0, 1, 2, 3],
      },
    ],
  })
}

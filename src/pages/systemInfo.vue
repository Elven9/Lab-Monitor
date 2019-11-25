<template>
  <div class="container">
    <h1 class="section-header">目前系統狀態 System Infomation</h1>
    <va-card>
      <va-data-table
        :fields="hardwareSpecField1"
        :data="hardwareSpec"
        :per-page="10"
        no-pagination
      />
      <va-data-table
        :fields="hardwareSpecField2"
        :data="hardwareSpec"
        :per-page="10"
        no-pagination
      />
      <va-data-table
        :fields="hardwareSpecField3"
        :data="hardwareSpec"
        :per-page="10"
        no-pagination
      />
    </va-card>
    <h1 class="section-header">工作組別狀態 Group Infomation</h1>
    <va-card>
      <va-select
        :label="$t('groupInfo.groupSelect')"
        v-model="groupSelect"
        searchable
        textBy="description"
        :options="groupSelectOption"
      />
      <h2>Selected Group: {{ groupSelect === '' ? '尚未選擇' : groupSelect }}</h2>
      <table class="va-table groupInfo">
        <thead>
          <tr>
            <th>{{ $t('groupInfo.groupTable.nodeType') }}</th>
            <th>{{ $t('groupInfo.groupTable.nodeCount') }}</th>
            <th>{{ $t('groupInfo.groupTable.cpuUsage') }}</th>
            <th>{{ $t('groupInfo.groupTable.hostMemoryUsage') }}</th>
            <th>{{ $t('groupInfo.groupTable.gpuUsage') }}</th>
            <th>{{ $t('groupInfo.groupTable.gpuMemoryUsage') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{ 'Node 型別' }}</td>
            <td>{{ 'Node 數量' }}</td>
            <td>
              <va-progress-bar :value="60" :color="returnColorCss('primary')">{{ `% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="60" :color="returnColorCss('primary')">{{ `% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="60" :color="returnColorCss('primary')">{{ `% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="60" :color="returnColorCss('primary')">{{ `% (使用量 / 總量)` }}</va-progress-bar>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import Mock from 'mockjs'
import { getHardwareSpec } from '../api/system'

import { hex2rgb } from '../services/color-functions'

export default {
  data () {
    return {
      hardwareSpec: [],
      groupSpec: [],

      // For Group Select
      groupSelect: '',
      groupSelectOption: [],
    }
  },
  computed: {
    hardwareSpecField1 () {
      return [{
        name: 'node_type',
        title: this.$t('systemInfo.nodeType'),
        width: '30%',
      }, {
        name: 'node_count',
        title: this.$t('systemInfo.nodeCount'),
        width: '20%',
      }, {
        name: 'cpu_type',
        title: this.$t('systemInfo.cpuType'),
        width: '50%',
      }]
    },
    hardwareSpecField2 () {
      return [{
        name: 'cpu_capacity',
        title: this.$t('systemInfo.cpuCapacity'),
        width: '30%',
      }, {
        name: 'cpu_count',
        title: this.$t('systemInfo.cpuCount'),
        width: '20%',
      }, {
        name: 'memory_size',
        title: this.$t('systemInfo.memorySize'),
        width: '50%',
      }]
    },
    hardwareSpecField3 () {
      return [ {
        name: 'gpu_type',
        title: this.$t('systemInfo.gpuType'),
        width: '25%',
      }, {
        name: 'gpu_capacity',
        title: this.$t('systemInfo.gpuCapacity'),
        width: '25%',
      }, {
        name: 'gpu_count',
        title: this.$t('systemInfo.gpuCount'),
        width: '25%',
      }, {
        name: 'gpu_memory_size',
        title: this.$t('systemInfo.memorySizePerGpu'),
        width: '25%',
      }]
    },
  },
  methods: {
    returnColorCss (theme) {
      return hex2rgb(this.$themes[theme], 1).css
    },
  },
  async mounted () {
    // Calling Api
    let hardwareSpec = await getHardwareSpec()

    this.hardwareSpec = hardwareSpec.data

    // Adding Mock Data
    for (let i = 0; i < 10; i++) {
      this.groupSelectOption.push(Mock.mock('@name'))
    }
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .section-header {
    margin: 20px 0px 20px 0px;
    font-size: 20px;
  }
  .va-card {
    min-width: 100%;
  }

  .va-data-table {
    overflow-x: unset;
    min-width: 100%;
    margin: 5px 0px 5px 0px;
  }

  .va-table {
    width: 100%;
    margin-top: 20px;
  }

  .groupInfo {
    td {
      width: 17%;
    }
  }
}
</style>

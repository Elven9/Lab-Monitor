<template>
  <div class="container">
    <h1 class="section-header">目前系統狀態 System Infomation</h1>
    <va-card class="system-info-card">
      <table class="va-table systemInfo">
        <thead>
          <tr>
            <th>{{ $t('systemInfo.nodeType') }}</th>
            <th>{{ $t('systemInfo.nodeCount') }}</th>
            <th>{{ $t('systemInfo.cpuType') }}</th>
            <th>{{ $t('systemInfo.cpuCapacity') }}</th>
            <th>{{ $t('systemInfo.cpuCount') }}</th>
            <th>{{ $t('systemInfo.memorySize') }}</th>
            <th>{{ $t('systemInfo.gpuType') }}</th>
            <th>{{ $t('systemInfo.gpuCapacity') }}</th>
            <th>{{ $t('systemInfo.gpuCount') }}</th>
            <th>{{ $t('systemInfo.memorySizePerGpu') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="h in hardwareSpec" :key="h.id">
            <td>{{ h.node_type }}</td>
            <td>{{ h.node_count }}</td>
            <td>{{ h.cpu_type }}</td>
            <td>{{ h.cpu_capacity }}</td>
            <td>{{ h.cpu_count }}</td>
            <td>{{ h.memory_size }}</td>
            <td>{{ h.gqu_type }}</td>
            <td>{{ h.gpu_capacity }}</td>
            <td>{{ h.gpu_count }}</td>
            <td>{{ h.gpu_memory_size }}</td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <!-- <h1 class="section-header">工作組別狀態 Group Infomation</h1>
    <va-card>
      <va-select
        :label="$t('groupInfo.groupSelect')"
        v-model="groupSelect"
        searchable
        textBy="description"
        :options="groupSelectOption"
        @input="triggerGroupSelect"
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
          <tr v-for="g in groupSpec" :key="g.id">
            <td>{{ g.node_type }}</td>
            <td>{{ g.node_count }}</td>
            <td>
              <va-progress-bar :value="g.cpu_usage" :color="returnColorCss(g.cpu_usage)">{{ `${g.cpu_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="g.host_memory_usage" :color="returnColorCss(g.host_memory_usage)">{{ `${g.host_memory_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="g.gpu_usage" :color="returnColorCss(g.gpu_usage)">{{ `${g.gpu_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="g.gpu_memory_usage" :color="returnColorCss(g.gpu_memory_usage)">{{ `${g.gpu_memory_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <h1 class="section-header">使用者個別狀態 User Infomation</h1>
    <va-card>
      <va-select
        :label="$t('userInfo.userSelect')"
        v-model="userSelect"
        searchable
        textBy="description"
        :options="userSelectOption"
        @input="triggerUserSelect"
      />
      <h2>Selected User: {{ userSelect === '' ? '尚未選擇' : userSelect }}</h2>
      <table class="va-table userInfo">
        <thead>
          <tr>
            <th>{{ $t('userInfo.userTable.nodeType') }}</th>
            <th>{{ $t('userInfo.userTable.cpuUsage') }}</th>
            <th>{{ $t('userInfo.userTable.hostMemoryUsage') }}</th>
            <th>{{ $t('userInfo.userTable.gpuUsage') }}</th>
            <th>{{ $t('userInfo.userTable.gpuMemoryUsage') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="u in userSpec" :key="u.id">
            <td>{{ u.node_type }}</td>
            <td>
              <va-progress-bar :value="u.cpu_usage" :color="returnColorCss(u.cpu_usage)">{{ `${u.cpu_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="u.host_memory_usage" :color="returnColorCss(u.host_memory_usage)">{{ `${u.host_memory_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="u.gpu_usage" :color="returnColorCss(u.gpu_usage)">{{ `${u.gpu_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
            <td>
              <va-progress-bar :value="u.gpu_memory_usage" :color="returnColorCss(u.gpu_memory_usage)">{{ `${u.gpu_memory_usage}% (使用量 / 總量)` }}</va-progress-bar>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card> -->
  </div>
</template>

<script>
import Mock from 'mockjs'
import { getHardwareSpec, getGroupInfo, getUserInfo } from '../api/system'

import { hex2rgb } from '../services/color-functions'

export default {
  data () {
    return {
      hardwareSpec: [],
      groupSpec: [],
      userSpec: [],

      // For Group Select
      groupSelect: '',
      groupSelectOption: [],

      // For User Select
      userSelect: '',
      userSelectOption: [],
    }
  },
  methods: {
    returnColorCss (value) {
      let targetTheme = ''

      if (value < 25) targetTheme = this.$themes['success']
      else if (value < 50) targetTheme = this.$themes['info']
      else if (value < 75) targetTheme = this.$themes['warning']
      else if (value <= 100) targetTheme = this.$themes['danger']
      else targetTheme = this.$themes['gray']

      return hex2rgb(targetTheme, 1).css
    },
    async triggerGroupSelect () {
      let groupInfo = await getGroupInfo(this.groupSelect)
      this.groupSpec = groupInfo.data
    },
    async triggerUserSelect () {
      let userInfo = await getUserInfo(this.userSelect)
      this.userSpec = userInfo.data
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

    for (let i = 0; i < 10; i++) {
      this.userSelectOption.push(Mock.mock('@name'))
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
  .system-info-card {
    width: 100%;
    overflow-x: scroll;

    .va-card__body {
      width: fit-content;
      overflow: visible;
    }

    .systemInfo {
      min-width: 1400px;
      td {
        width: 10%;
      }
    }
  }

  .groupInfo {
    td {
      width: 17%;
    }
  }

  .userInfo {
    td {
      width: 20%;
    }
  }
}
</style>

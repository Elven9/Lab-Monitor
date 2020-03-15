<template>
  <div class="container">
    <h1 class="section-header">佇列狀態 Queue Status Information</h1>
    <va-card>
      <div class="aggregator-checkbox">
        <va-checkbox label="Interactive" v-model="isInteractiveChart"/>
        <va-checkbox label="Train" v-model="isTrainChart"/>
        <va-checkbox label="Service" v-model="isServiceChart"/>
      </div>
      <va-chart :data="queueChartData" :options="{}" type="line" />
      <va-data-table
        :fields="queueStatusField"
        :data="queueStatusData"
        :per-page="10"
        no-pagination
      />
    </va-card>
    <h1 class="section-header">個別佇列詳細狀態 Queue Detail Infomation</h1>
    <!-- Interactive Queue -->
    <va-card :title="$t('queueStatus.title.interactiveQueue')">
      <table class="va-table jobInfo">
        <thead>
          <tr>
            <th>{{ $t('queueStatus.job.submissionTime') }}</th>
            <!-- <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th> -->
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in interactiveQueueData" :key="q.id">
            <td>{{ q.submission_time }}</td>
            <!-- <td>{{ q.group_id }}</td>
            <td>{{ q.user_id }}</td> -->
            <td>{{ q.job_id }}</td>
            <td>{{ q.job_type }}</td>
            <td>
              <a class="download-link" :href="q.yaml_link">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <!-- Train Queue -->
    <va-card :title="$t('queueStatus.title.trainQueue')">
      <table class="va-table jobInfo">
        <thead>
          <tr>
            <th>{{ $t('queueStatus.job.submissionTime') }}</th>
            <!-- <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th> -->
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in trainQueueData" :key="q.id">
            <td>{{ q.submission_time }}</td>
            <!-- <td>{{ q.group_id }}</td>
            <td>{{ q.user_id }}</td> -->
            <td>{{ q.job_id }}</td>
            <td>{{ q.job_type }}</td>
            <td>
              <a class="download-link" :href="q.yamlLink">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <!-- Service Queue -->
    <va-card :title="$t('queueStatus.title.serviceQueue')">
      <table class="va-table jobInfo">
        <thead>
          <tr>
            <th>{{ $t('queueStatus.job.submissionTime') }}</th>
            <!-- <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th> -->
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in serviceQueueData" :key="q.id">
            <td>{{ q.submission_time }}</td>
            <!-- <td>{{ q.group_id }}</td>
            <td>{{ q.user_id }}</td> -->
            <td>{{ q.job_id }}</td>
            <td>{{ q.job_type }}</td>
            <td>
              <a class="download-link" :href="q.yaml_link">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import { getQueueStatistics, getInteractiveQueue, getTrainQueue, getServiceQueue } from '../api/system'

import { hex2rgb } from '../services/color-functions'

export default {
  data () {
    return {
      queueChartData: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [{}],
      },
      backupData: '',

      // CheckBox
      isInteractiveChart: true,
      isTrainChart: true,
      isServiceChart: true,

      queueStatusData: [],
      interactiveQueueData: [],
      trainQueueData: [],
      serviceQueueData: [],
    }
  },
  computed: {
    queueStatusField () {
      return [{
        name: 'queue_type',
        title: this.$t('queueStatus.title.queueType'),
        width: '60%',
      }, {
        name: 'avg_job_wait_time',
        title: this.$t('queueStatus.title.avgJobWaitTime'),
        width: '20%',
      }, {
        name: 'avg_queue_len',
        title: this.$t('queueStatus.title.avgQueueLen'),
        width: '20%',
      }]
    },
  },
  methods: {
    async updateQueueStatistic () {
      let data = await getQueueStatistics()

      let newChartData = {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [],
      }

      newChartData.datasets.push({
        label: `Interactive Job Queue`,
        data: data.data['interactive'],
        borderWidth: 2,
        borderColor: hex2rgb(this.$themes['primary'], 1).css,
        backgroundColor: hex2rgb(this.$themes['primary'], 0.6).css,
        fill: false,
        lineTension: 0.2,
      })

      newChartData.datasets.push({
        label: `Train Job Queue`,
        data: data.data['train'],
        borderWidth: 2,
        borderColor: hex2rgb(this.$themes['success'], 1).css,
        backgroundColor: hex2rgb(this.$themes['success'], 0.6).css,
        fill: false,
        lineTension: 0.2,
      })

      newChartData.datasets.push({
        label: `Service Job Queue`,
        data: data.data['service'],
        borderWidth: 2,
        borderColor: hex2rgb(this.$themes['info'], 1).css,
        backgroundColor: hex2rgb(this.$themes['info'], 0.6).css,
        fill: false,
        lineTension: 0.2,
      })

      this.backupData = JSON.stringify(newChartData)

      this.queueChartData = newChartData
      this.queueStatusData = data.data['time_info']
    },
    toggleChart () {
      let bData = JSON.parse(this.backupData)
      let interactiveIdx = bData.datasets.findIndex(e => e.label === `Interactive Job Queue`)
      let trainIdx = bData.datasets.findIndex(e => e.label === `Train Job Queue`)
      let serviceIdx = bData.datasets.findIndex(e => e.label === `Service Job Queue`)

      if (!this.isInteractiveChart) bData.datasets.splice(interactiveIdx, 1)
      if (!this.isTrainChart) bData.datasets.splice(trainIdx, 1)
      if (!this.isServiceChart) bData.datasets.splice(serviceIdx, 1)

      this.queueChartData = bData
    },
  },
  watch: {
    isInteractiveChart () {
      this.toggleChart()
    },
    isTrainChart () {
      this.toggleChart()
    },
    isServiceChart () {
      this.toggleChart()
    },
  },
  async mounted () {
    this.updateQueueStatistic()

    // Queue Data
    let interactiveData = await getInteractiveQueue()
    let trainData = await getTrainQueue()
    let serviceData = await getServiceQueue()

    this.interactiveQueueData = interactiveData.data
    this.trainQueueData = trainData.data
    this.serviceQueueData = serviceData.data
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .aggregator-checkbox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }

  .download-link {
    color: rgba(25,162,245,1);
  }

  .section-header {
    margin: 10px 0px 10px 0px;
    font-size: 20px;
  }
  .va-card {
    min-width: 100%;
    margin: 10px 0px 10px 0px;
  }

  .va-data-table {
    overflow-x: unset;
    min-width: 100%;
    margin: 5px 0px 5px 0px;
  }

  .va-table {
    width: 100%;
  }

  .jobInfo {
    td {
      width: 17%;
    }
  }
}
</style>

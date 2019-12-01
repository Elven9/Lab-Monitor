<template>
  <div class="container">
    <h1 class="section-header">佇列狀態 Queue Status Information</h1>
    <va-card>
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
            <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th>
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in interactiveQueueData" :key="q.id">
            <td>{{ q.submissionTime }}</td>
            <td>{{ q.groupId }}</td>
            <td>{{ q.userId }}</td>
            <td>{{ q.jobId }}</td>
            <td>{{ q.jobType }}</td>
            <td>
              YamlDonwloadLink
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
            <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th>
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in trainQueueData" :key="q.id">
            <td>{{ q.submissionTime }}</td>
            <td>{{ q.groupId }}</td>
            <td>{{ q.userId }}</td>
            <td>{{ q.jobId }}</td>
            <td>{{ q.jobType }}</td>
            <td>
              YamlDonwloadLink
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
            <th>{{ $t('queueStatus.job.groupId') }}</th>
            <th>{{ $t('queueStatus.job.userId') }}</th>
            <th>{{ $t('queueStatus.job.jobId') }}</th>
            <th>{{ $t('queueStatus.job.jobType') }}</th>
            <th>{{ $t('queueStatus.job.yamlFile') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="q in serviceQueueData" :key="q.id">
            <td>{{ q.submissionTime }}</td>
            <td>{{ q.groupId }}</td>
            <td>{{ q.userId }}</td>
            <td>{{ q.jobId }}</td>
            <td>{{ q.jobType }}</td>
            <td>
              YamlDonwloadLink
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
// import { getInteractiveQueue, getTrainQueue, getServiceQueue } from '../api/system'

// import { hex2rgb } from '../services/color-functions'

export default {
  data () {
    return {
      queueChartData: {
        labels: [0, 1, 2, 3, 4],
        datasets: {},
      },
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
  async mounted () {
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

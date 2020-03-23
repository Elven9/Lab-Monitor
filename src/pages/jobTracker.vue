<template>
  <div class="container">
    <h1 class="section-header">工作追蹤 Job Information</h1>
    <!-- Job Tracker -->
    <va-card>
      <table class="va-table jobInfo">
        <thead>
          <tr>
            <!-- <th>{{ $t('jobTracker.field.groupId') }}</th>
            <th>{{ $t('jobTracker.field.userId') }}</th> -->
            <th>{{ $t('jobTracker.field.jobId') }}</th>
            <!-- <th>{{ $t('jobTracker.field.jobType') }}</th> -->
            <th>{{ $t('jobTracker.field.submissionTime') }}</th>
            <th>{{ $t('jobTracker.field.startTime') }}</th>
            <th>{{ $t('jobTracker.field.endTime') }}</th>
            <th>{{ $t('jobTracker.field.exeTime') }}</th>
            <!-- <th>{{ $t('jobTracker.field.waitTime') }}</th> -->
            <th>{{ $t('jobTracker.field.state') }}</th>
            <th>{{ $t('jobTracker.field.yamlDownload') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="j in jobs" :key="j.id">
            <!-- <td>{{ j.group_id }}</td>
            <td>{{ j.user_id }}</td> -->
            <td>{{ j.job_id }}</td>
            <!-- <td>{{ j.job_type }}</td> -->
            <td>{{ j.submission_time }}</td>
            <td>{{ j.start_time }}</td>
            <td>{{ j.end_time == "" ? "尚未結束" : j.end_time }}</td>
            <td>{{ j.exe_time == "" ? "尚未結束" : j.exe_time }}</td>
            <!-- <td>{{ `${j.wait_time} hr` }}</td> -->
            <td>
              <va-badge v-if="j.state == 0" color="success">Completed</va-badge>
              <va-badge v-if="j.state == 1" color="info">Running</va-badge>
              <va-badge v-if="j.state == 2" color="danger">Failed</va-badge>
              <va-badge v-if="j.state == 3" color="warning">Waiting</va-badge>
            </td>
            <td>
              <a class="download-link" :href="j.yaml_link">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </div>
</template>

<script>
import { getJobs } from '../api/system'

// import { hex2rgb } from '../services/color-functions'

export default {
  data () {
    return {
      jobs: [],
    }
  },
  async mounted () {
    let data = await getJobs()
    this.jobs = data.data
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .download-link {
    color: rgba(25,162,245,1);
  }

  .section-header {
    margin: 10px 0px 10px 0px;
    font-size: 20px;
  }
  .va-card {
    width: 100%;
    overflow-x: scroll;

    .va-card__body {
      width: fit-content;
      overflow: visible;
    }
  }

  .va-table {
    width: 1400px;
  }

  .jobInfo {
    td {
      width: 9%;
    }
  }
}
</style>

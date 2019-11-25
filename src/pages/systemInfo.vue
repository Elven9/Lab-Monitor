<template>
  <div class="container">
    <h1 class="section-header">目前系統狀態 System Infomation</h1>
    <va-card>
      <va-data-table
        :fields="fields1"
        :data="data"
        :per-page="10"
        no-pagination
      />
      <va-data-table
        :fields="fields2"
        :data="data"
        :per-page="10"
        no-pagination
      />
      <va-data-table
        :fields="fields3"
        :data="data"
        :per-page="10"
        no-pagination
      />
    </va-card>
  </div>
</template>

<script>
import { getHardwareSpec } from '../api/system'

export default {
  data () {
    return {
      data: [],
    }
  },
  computed: {
    fields1 () {
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
    fields2 () {
      return [{
        name: 'cpu_capacity',
        title: this.$t('systemInfo.cpuCapacity'),
        width: '30%',
      }, {
        name: 'cpu_count',
        title: this.$t('systemInfo.cpuCount'),
        width: '30%',
      }, {
        name: 'memory_size',
        title: this.$t('systemInfo.memorySize'),
        width: '40%',
      }]
    },
    fields3 () {
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
  methods: {},
  async mounted () {
    // Calling Api
    let data = await getHardwareSpec()

    this.data = data.data
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
}
</style>

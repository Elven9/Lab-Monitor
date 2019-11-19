<template>
  <div class="container">
    <h1 class="section-header">目前系統狀態 System Infomation</h1>
    <va-card>
      <div class="multiple-table">
        <va-data-table
          :fields="fields1"
          :data="users"
          :per-page="10"
          no-pagination
        />
        <va-data-table
          :fields="fields2"
          :data="users"
          :per-page="10"
          no-pagination
        />
        <va-data-table
          :fields="fields3"
          :data="users"
          :per-page="10"
          no-pagination
        />
      </div>
    </va-card>
  </div>
</template>

<script>
import users from '../data/mock/hardwareInfo.json'

export default {
  data () {
    return {
      users: users.slice(),
    }
  },
  computed: {
    fields1 () {
      return [{
        name: 'nodeType',
        title: this.$t('systemInfo.nodeType'),
        sortField: 'nodeType',
        width: '30%',
      }, {
        name: 'nodeCount',
        title: this.$t('systemInfo.nodeCount'),
        width: '30%',
      }, {
        name: 'cpuType',
        title: this.$t('systemInfo.cpuType'),
        sortField: 'cpuType',
        width: '40%',
      }]
    },
    fields2 () {
      return [{
        name: 'cpuCapacity',
        title: this.$t('systemInfo.cpuCapacity'),
        sortField: 'cpuCapacity',
        width: '30%',
      }, {
        name: 'cpuCount',
        title: this.$t('systemInfo.cpuCount'),
        width: '30%',
      }, {
        name: 'memorySize',
        title: this.$t('systemInfo.memorySize'),
        sortField: 'memorySize',
        width: '30%',
      }]
    },
    fields3 () {
      return [ {
        name: 'gpuType',
        title: this.$t('systemInfo.gpuType'),
        sortField: 'gpuType',
        width: '25%',
      }, {
        name: 'gpuCapacity',
        title: this.$t('systemInfo.gpuCapacity'),
        sortField: 'gpuCapacity',
        width: '25%',
      }, {
        name: 'gpuCount',
        title: this.$t('systemInfo.gpuCount'),
        sortField: 'gpuCount',
        width: '25%',
      }, {
        name: 'memorySizePerGpu',
        title: this.$t('systemInfo.memorySizePerGpu'),
        sortField: 'memorySizePerGpu',
        width: '25%',
      }]
    },
  },
  methods: {},
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

  .multiple-table {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;

    .va-data-table {
      overflow-x: unset;
      min-width: 100%;
    }
  }
}
</style>

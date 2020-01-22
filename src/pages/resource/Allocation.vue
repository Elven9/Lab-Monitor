<template>
  <div>
    <!-- 輸入欄位，指定要看哪一些資料 -->
    <va-card :title="$t('resource.cardTitle.form')">
      <div class="row">
        <div class="flex xs6">
          <va-select
            :label="$t('resource.select.resourceType.title')"
            v-model="resourceType"
            textBy="description"
            :options="resourceTypeOptions"
          />
          <va-input
            v-model="resourceId"
            placeholder="請輸入資源 ID"
          >
          </va-input>
          <va-button @click="addTarget" :disabled="!isAddable">{{ $t('resource.button.addTarget') }}</va-button>
        </div>
        <div class="flex xs6">
          <va-list fit>
            <va-list-label>
              已新增目標資源
            </va-list-label>

            <template v-for="(t, idx) in resourceTargets">
              <va-item :key="t.id+idx">
                <va-item-section>
                  <va-item-label>
                    {{ `${t.type}, id: ${t.id}` }}
                  </va-item-label>

                  <va-item-label caption>
                    {{ `${t.start} ~ ${t.end}` }}
                  </va-item-label>
                </va-item-section>

                <va-item-section side>
                  <div class="icon-click" @click="deleteResource(t.type, t.id)">
                    <va-icon name="ion ion-ios-close-circle-outline" color="gray" />
                  </div>
                </va-item-section>
              </va-item>

              <va-list-separator v-if="idx !== resourceTargets.length - 1" :key="t.id+idx+111"/>
            </template>
          </va-list>
          <va-button @click="submit" :disabled="!isSubmmitable">{{ $t('resource.button.submit') }}</va-button>
        </div>
      </div>
    </va-card>

    <!-- CPU -->
    <va-card v-show="isShowingData" :title="$t('resourceAllocation.title.cpu')">
      <div class="node-list">
        <div class="node" v-for="(node, idx) in nodesData[0]" :key="node.id">
          <h1>{{ `Node ${idx}` }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card>

    <!-- GPU -->
    <va-card v-show="isShowingData" :title="$t('resourceAllocation.title.gpu')">
      <div class="node-list">
        <div class="node" v-for="(node, idx) in nodesData[1]" :key="node.id">
          <h1>{{ `Node ${idx}` }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card>

    <!-- mem -->
    <va-card v-show="isShowingData" :title="$t('resourceAllocation.title.mem')">
      <div class="node-list">
        <div class="node" v-for="(node, idx) in nodesData[2]" :key="node.id">
          <h1>{{ `Node ${idx}` }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
import { hex2rgb } from '../../services/color-functions'
import { getResourceAllocation } from '../../api/resource.js'

export default {
  data () {
    return {
      resourceType: '',
      resourceTypeOptions: [
        'Node',
        // 'Group',
        // 'User',
        'Job',
        'Jobtype',
      ],
      resourceId: '',
      resourceTargets: [],

      // For Pie Chart
      isShowingData: true,
      nodesData: [[], [], []],
      colorSequence: ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'dark'],
      defaultChartTemplate: {
        dataPayload: {
          datasets: [
            {
              data: [1],
              backgroundColor: [hex2rgb(this.$themes['gray'], 1).css],
            },
          ],
          labels: ['None'],
        },
        option: {
          legend: { display: false },
          title: { display: false },
        },
      },
      nodeCount: 1,
    }
  },
  methods: {
    addTarget () {
      // 確認不要重複新增
      for (let i = 0; i < this.resourceTargets.length; i++) {
        if (this.resourceTargets[i].type === this.resourceType && this.resourceTargets[i].id === this.resourceId) { return }
      }
      this.resourceTargets.push({
        'type': this.resourceType,
        'id': this.resourceId,
      })
    },
    deleteResource (resource, id) {
      let idx = this.resourceTargets.findIndex(r => r.type === resource && r.id === id)
      if (idx !== -1) this.resourceTargets.splice(idx, 1)
    },
    async submit () {
      // Process Payload
      let payload = {
        resource: [0, 1, 2], // Get All Resource, CPU, GPU, Memory
        identifier: this.resourceTargets,
      }
      let data = await getResourceAllocation(payload)
      this.updateData(data.data)
    },
    updateData (data) {
      this.isShowingData = false

      let newData = [[], [], []]

      // Add Default Pie Data
      for (let i = 0; i < this.nodeCount; i++) {
        // Deep Clone You Mother Fucker.
        newData[0].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
        newData[1].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
        newData[2].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
      }

      // Process Data
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
          let labelName = `Pod ID: ${data[i].data[j].location.podId}`

          if (newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.labels[0] === 'None') {
            newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.datasets[0].data = []
            newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.datasets[0].backgroundColor = []
            newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.labels = []
          }

          newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.datasets[0].data.push(data[i].data[j].usage)
          newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.datasets[0].backgroundColor.push(hex2rgb(this.$themes[this.colorSequence[newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.datasets[0].data.length - 1]], 1).css)
          newData[data[i].resource][data[i].data[j].location.nodeId].dataPayload.labels.push(labelName)
        }
      }

      this.nodesData = []
      setTimeout(() => {
        this.nodesData = newData
        setTimeout(() => {
          // Resize Canvas
          this.setChartSize()
          this.isShowingData = true
        }, 500)
      }, 500)
    },
    setChartSize () {
      let target = document.getElementsByClassName('node-container')

      for (let j = 0; j < target.length; j++) {
        let donuts = target[j].getElementsByTagName('canvas')
        for (let i = 0; i < donuts.length; i++) {
          donuts[i].width = 40
          donuts[i].height = 40
          donuts[i].style.width = `200px`
          donuts[i].style.height = `200px`
        }
      }
    },
  },
  computed: {
    isAddable () {
      return this.resourceType.length !== 0 && this.resourceId.length !== 0
    },
    isSubmmitable () {
      return this.resourceTargets.length !== 0
    },
  },
  created () {
    // Add Default Pie Data
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodesData[0].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
      this.nodesData[1].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
      this.nodesData[2].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
    }
  },
  mounted () {
    // Resize Canvas
    this.setChartSize()
  },
}
</script>

<style lang="scss" scoped>
.va-card {
  margin-bottom: 30px;

  .va-list {
    margin-bottom: 15px;
  }
}

.icon-click {
  cursor: pointer;

  &:hover {
    i {
      color: black !important;
    }
  }
}

.node-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;

  .node {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .node-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 200px;
      min-height: 220px;
      padding: 8px;
      margin: 5px;

      border: solid black 1px;
      border-radius: 20px;
    }
  }
}
</style>

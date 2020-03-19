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
                    {{ `${t.type}: ${t.id}` }}
                  </va-item-label>

                  <!-- <va-item-label caption>
                    {{ `${t.start} ~ ${t.end}` }}
                  </va-item-label> -->
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
    <va-card v-show="isShowingData" :title="$t('resourceAllocation.title')">
      <div class="node-list">
        <div class="node" v-for="node in nodesData" :key="node.id">
          <h1>{{ node.nodeName }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card>

    <!-- GPU -->
    <!-- <va-card v-show="isShowingData" :title="$t('resourceAllocation.title.gpu')">
      <div class="node-list">
        <div class="node" v-for="(node, idx) in nodesData[1]" :key="node.id">
          <h1>{{ `Node ${idx}` }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card> -->

    <!-- mem -->
    <!-- <va-card v-show="isShowingData" :title="$t('resourceAllocation.title.mem')">
      <div class="node-list">
        <div class="node" v-for="(node, idx) in nodesData[2]" :key="node.id">
          <h1>{{ `Node ${idx}` }}</h1>
          <div class="node-container">
            <va-chart :data="node.dataPayload" :options="node.option" type="donut" />
          </div>
        </div>
      </div>
    </va-card> -->
  </div>
</template>

<script>
import { hex2rgb } from '../../services/color-functions'
import { getResourceAllocation } from '../../api/resource.js'
import { getHardwareSpec } from '../../api/system.js'

export default {
  data () {
    return {
      resourceType: '',
      resourceTypeOptions: [
        'Node',
        // 'Group',
        // 'User',
        'Job',
        // 'Jobtype',
      ],
      resourceId: '',
      resourceTargets: [],

      // For Pie Chart
      isShowingData: true,
      nodesData: [],
      colorSequence: ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'dark'],
      defaultChartTemplate: {
        nodeName: 'Node',
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
      nodeNameList: [],
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
        identifier: this.resourceTargets,
      }
      let data = await getResourceAllocation(payload)
      this.updateData(data.data)
    },
    updateData (data) {
      this.isShowingData = false

      // let newData = [[], [], []]
      let newData = []

      // Add Default Pie Data
      for (let i = 0; i < this.nodeNameList.length; i++) {
        // Deep Clone You Mother Fucker.
        newData.push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
        // newData[1].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
        // newData[2].push(JSON.parse(JSON.stringify(this.defaultChartTemplate)))
      }

      // Process Data
      // Extract Identifier Information
      for (let i = 0; i < data.length; i++) {
        if (data[i].data == null) continue
        // Pod Data
        for (let j = 0; j < data[i].data.length; j++) {
          if (newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.labels[0] === 'None') {
            newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].nodeName = data[i].data[j].nodeId
            newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.datasets[0].data = []
            newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.datasets[0].backgroundColor = []
            newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.labels = []
          }

          newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.datasets[0].data.push(1)
          newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.datasets[0].backgroundColor.push(hex2rgb(this.$themes[this.colorSequence[newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.datasets[0].data.length - 1]], 1).css)
          newData[this.nodeNameList.indexOf(data[i].data[j].nodeId)].dataPayload.labels.push(`${data[i].data[j].podId}${data[i].data[j].cpuUsage !== ' core(s)' ? `, ${data[i].data[j].cpuUsage}` : ''}${data[i].data[j].memUsage !== '' ? `, ${data[i].data[j].memUsage}` : ''}`)
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
          donuts[i].width = 100
          donuts[i].height = 100
          donuts[i].style.width = `300px`
          donuts[i].style.height = `300px`
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
  async created () {
    let hardwareSpec = await getHardwareSpec()

    hardwareSpec.data.forEach(h => {
      this.nodeNameList.push(h.node_type)
    })

    // Add Default Pie Data
    for (let i = 0; i < this.nodeNameList.length; i++) {
      let newNodeData = JSON.parse(JSON.stringify(this.defaultChartTemplate))
      newNodeData.nodeName = this.nodeNameList[i]
      this.nodesData.push(newNodeData)
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
      max-width: 300px;
      min-height: 220px;
      padding: 8px;
      margin: 5px;

      border: solid black 1px;
      border-radius: 20px;
    }
  }
}
</style>

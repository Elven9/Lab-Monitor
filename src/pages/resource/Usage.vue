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
          <va-date-picker
            :label="$t('resource.dateTime.start')"
            :config="{enableTime: true}"
            v-model="timeRangeStart"
          />
          <va-date-picker
            :label="$t('resource.dateTime.end')"
            :config="{enableTime: true}"
            v-model="timeRangeEnd"
          />
          <va-slider
            label="limit"
            :invert-label="true"
            color="info"
            value-visible
            v-model="limit"
            :min="1"
            :max="20"
          />
          <va-checkbox
            label="DESC"
            v-model="isDesc"
          />
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

    <!-- Charts -->
    <va-card :title="$t('resource.cardTitle.cpu')">
      <va-chart :data="cpuChartData" :options="chartOption" type="line" />
    </va-card>
    <va-card :title="$t('resource.cardTitle.gpu')">
      <va-chart :data="gpuChartData" :options="chartOption" type="line" />
    </va-card>
    <va-card :title="$t('resource.cardTitle.memory')">
      <va-chart :data="memChartData" :options="chartOption" type="line" />
    </va-card>

    <!-- Pie -->
    <va-card :title="$t('resource.cardTitle.nodeStatus')">
      <div class="node-list">
        <div class="node-container">
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
        </div>
        <div class="node-container">
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
        </div>
        <div class="node-container">
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
        </div>
        <div class="node-container">
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
          <div class="pod-row">
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
            <va-chart :data="testDataForPie" :options="testOptionForPie" type="donut" />
          </div>
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
import { hex2rgb } from '../../services/color-functions'
import { getResourceUsage } from '../../api/resource.js'

export default {
  data () {
    return {
      resourceType: '',
      resourceTypeOptions: [
        'Node',
        'Group',
        'User',
        'Job',
        'Jobtype',
      ],
      resourceId: '',
      resourceTargets: [],
      timeRangeStart: '',
      timeRangeEnd: '',
      limit: 6,
      isDesc: false,

      // Chart Related
      colorSequence: ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'dark'],
      cpuChartData: {},
      gpuChartData: {},
      memChartData: {},
      chartOption: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
            },
          }],
        },
      },

      testDataForPie: {
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: [
            hex2rgb(this.$themes['primary'], 1).css,
            hex2rgb(this.$themes['secondary'], 1).css,
            hex2rgb(this.$themes['info'], 1).css,
          ],
        }],
        labels: [
          'Red',
          'Yellow',
          'ddd',
        ],
      },
      testOptionForPie: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'POD1',
        },
      },
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
        start: this.timeRangeStart,
        end: this.timeRangeEnd,
        limit: this.limit,
        order: this.isDesc ? 'DESC' : 'ASC',
      }
      let data = await getResourceUsage(payload)
      this.updateData(data.data)
    },
    updateData (data) {
      console.log(data)
      let defaultObjects = [{
        labels: [...Array(this.limit).keys()],
        datasets: [],
      },
      {
        labels: [...Array(this.limit).keys()],
        datasets: [],
      },
      {
        labels: [...Array(this.limit).keys()],
        datasets: [],
      }]
      let colorCount = [0, 0, 0]

      // Process Data
      for (let i = 0; i < data.length; i++) {
        let dataset = {
          label: `${data[i].identifier.id}, ${data[i].identifier.type}`,
          data: data[i].data.map(d => d.usage),
          borderWidth: 2,
          borderColor: hex2rgb(this.$themes[this.colorSequence[colorCount[data[i].resource]++]], 1).css,
          fill: false,
          lineTension: 0.2,
        }

        // Push To Char Data
        defaultObjects[data[i].resource].datasets.push(dataset)
      }

      this.cpuChartData = defaultObjects[0]
      this.gpuChartData = defaultObjects[1]
      this.memChartData = defaultObjects[2]
    },
  },
  computed: {
    isAddable () {
      return this.resourceType.length !== 0 && this.resourceId.length !== 0
    },
    isSubmmitable () {
      return this.timeRangeEnd.length !== 0 && this.timeRangeStart.length !== 0 && this.resourceTargets.length !== 0
    },
  },
  mounted () {
    // Resize Canvas
    let target = document.getElementsByClassName('pod-row')

    for (let j = 0; j < target.length; j++) {
      let donuts = target[j].getElementsByTagName('canvas')
      for (let i = 0; i < donuts.length; i++) {
        donuts[i].width = 50
        donuts[i].height = 50
        donuts[i].style.width = `100px`
        donuts[i].style.height = `100px`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.va-card {
  margin-bottom: 30px;

  .va-list {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .va-checkbox {
    margin-top: 5px;
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
  justify-content: center;
  align-items: center;

  .node-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 240px;
    padding: 8px;
    margin: 5px;

    border: solid black 1px;
    border-radius: 20px;

    .pod-row {
      width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .va-chart {
        margin: 5px;
      }
    }
  }
}
</style>

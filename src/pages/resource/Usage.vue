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
          <va-button @click="addTarget">{{ $t('resource.button.addTarget') }}</va-button>
        </div>
        <div class="flex xs6">
          <va-list fit>
            <va-list-label>
              已新增目標資源
            </va-list-label>

            <template>
              <va-item>
                <va-item-section>
                  <va-item-label>
                    Node
                  </va-item-label>

                  <va-item-label caption>
                    id: 111
                  </va-item-label>
                </va-item-section>

                <va-item-section side>
                  <div class="icon-click" @click="deleteResource">
                    <va-icon name="ion ion-ios-close-circle-outline" color="gray" />
                  </div>
                </va-item-section>
              </va-item>

              <va-list-separator/>
            </template>
          </va-list>
        </div>
      </div>
    </va-card>

    <va-card :title="$t('resource.cardTitle.cpu')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
    <va-card :title="$t('resource.cardTitle.gpu')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
    <va-card :title="$t('resource.cardTitle.memory')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
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

      count: 0,
      deD: [100, 19, 3, 5, 2, 3, 11, 22],
      chartData: {},
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
      testOption: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    }
  },
  methods: {
    addTarget () {
      console.log('addTarget')
    },
    deleteResource () {
      console.log('deleteResource')
    },
    updateData () {
      let newArray = []
      this.deD.push(this.deD[0])
      let data = this.deD.slice(1)
      this.deD = data
      for (let i = this.count; i < this.count + 8; i++) {
        newArray.push(i)
      }
      this.count++
      let defaultObject = {
        labels: newArray,
        datasets: [{
          label: '# of Votes',
          data,
          borderWidth: 1,
          borderColor: hex2rgb(this.$themes['primary'], 1).css,
          backgroundColor: hex2rgb(this.$themes['primary'], 0.6).css,
        },
        {
          label: '# of Votes',
          data: data.map(d => d + 100),
          borderWidth: 1,
          borderColor: hex2rgb(this.$themes['secondary'], 1).css,
          backgroundColor: hex2rgb(this.$themes['secondary'], 0.6).css,
        }],
      }

      this.chartData = defaultObject
    },
  },
  mounted () {
    setInterval(this.updateData, 1000)

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

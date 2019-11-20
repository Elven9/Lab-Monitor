<template>
  <div>
    <va-card :title="$t('resourceInfo.cpu')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
    <va-card :title="$t('resourceInfo.gpu')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
    <va-card :title="$t('resourceInfo.memory')">
      <va-chart :data="chartData" :options="testOption" type="line" />
    </va-card>
    <va-card :title="$t('resourceInfo.nodeStatus')">
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
    </va-card>
  </div>
</template>

<script>
import { hex2rgb } from '../../services/color-functions'

export default {
  data () {
    return {
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

.node-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 240px;
  padding: 8px;

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
</style>

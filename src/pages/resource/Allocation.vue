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
      this.charData = data.data
      this.updateData()
    },
    updateData () {

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

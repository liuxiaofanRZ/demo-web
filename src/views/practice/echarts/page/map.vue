<template>
  <div class="flex">
    <div style="width: 500px; height: 500px" id="practice_echarts_map"></div>
    <div style="width: 500px; height: 500px" id="practice_echarts_bar"></div>
  </div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts'
// geojson
import rizhaoshi_geo from '../data/371100.json'
import donggangqu_geo from '../data/371102.json'
// svg
import Beef_cuts_France from '../data/371102.svg?raw'
// theme
import theme from '../data/theme.json'
import { onMounted, onBeforeUnmount, ref, onBeforeMount } from 'vue'

onBeforeMount(async () => {
  // 注册样式
  echarts.registerTheme('vintage', theme.theme)
  // 注册map
  echarts.registerMap('RZ', rizhaoshi_geo)
})

const myChart1 = ref(null)
const myChart2 = ref(null)
function setMap() {
  // 接下来的使用就跟之前一样，初始化图表，设置配置项
  myChart1.value = echarts.init(
    document.getElementById('practice_echarts_map'),
    'vintage'
  )
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
    },
    series: [
      {
        name: '香港18区人口密度',
        type: 'map',
        map: 'RZ',
        label: {
          show: true,
        },
        data: [
          { name: '五莲县', value: 20057.34 },
          { name: '莒县', value: 31686.1 },
          { name: '东港区', value: 6992.6 },
          { name: '岚山区', value: 44045.49 },
        ],
      },
    ],
  }
  myChart1.value.setOption(option)
}
function setBar() {
  myChart2.value = echarts.init(document.getElementById('practice_echarts_bar'))

  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  myChart2.value.setOption(option)
}
onMounted(() => {
  setMap()
  setBar()
})

onBeforeUnmount(() => {
  myChart1.value && myChart1.value.dispose()
  myChart2.value && myChart2.value.dispose()
})
</script>

<style lang="scss" scoped></style>

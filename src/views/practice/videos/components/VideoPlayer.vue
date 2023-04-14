<template>
  <a-card>
    <div><video ref="videoPlayer" class="video-js"></video></div>
    <div class="mt-sm">
      经典应用：
      <a-space>
        <a-button @click="setfullScreen">全屏</a-button>
        <a-button @click="disableProgress">禁用滚动条</a-button>
      </a-space>
    </div>
  </a-card>
</template>

<script setup>
import { Typography } from 'ant-design-vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { onUnmounted, onMounted } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    },
  },
})
const player = ref()
const videoPlayer = ref()
function setfullScreen() {
  player.value.requestFullscreen()
}
function disableProgress() {
  let pc = player.value.getChild('ControlBar').getChild('ProgressControl')
  pc.disable()
  console.log(pc)
}
onMounted(() => {
  player.value = videojs(videoPlayer.value, props.options, () => {
    player.value.log('onPlayerReady', this)
  })
  player.value.on('seeked', (e) => {
    console.log(e)
  })
  player.value.on('timeupdate', (e) => {
    console.log(player.value.currentTime())
  })
})
onUnmounted(() => {
  player.value.dispose()
})
</script>

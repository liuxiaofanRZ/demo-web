<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import sampleVideo from '../data/SampleVideo_1280x720_30mb.mp4'
const videoOptions = ref({
  progressControl: false,
  // autoplay: true,
  width: 800,
  height: 1200,
  fluid: true,
  controls: true,
  aspectRatio:"4:3",
  // fullscreen: {options: {navigationUI: 'hide'}},
  responsive: true,
  // audioPosterMode: true,
  breakpoints: {
    tiny: 300,
    xsmall: 400,
    small: 500,
    medium: 600,
    large: 700,
    xlarge: 800,
    huge: 900,
  },
  // controlBar: {
  //   // 将“BigPlayButton”添加到控制条中
  //   children: {
  //     'progressControl': true

  //   }
  // },
  sources: [
    {
      src: sampleVideo,
      type: 'video/mp4',
    },
  ],
})
</script>

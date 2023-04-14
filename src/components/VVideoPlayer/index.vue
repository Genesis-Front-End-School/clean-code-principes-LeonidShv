<template>
  <video
    @[mouseoverName]="turnOn"
    @[mouseleaveName]="tyrnOff"
    @pause="pause"
    @ended="pause"
    @keyup="changeSpeed"
    ref="video"
    id="video"
    :poster="previewImageLink"
    :controls="!isPreview"
    :[muted]="isPreview"
    title="Buttons W and S can change speed of your player"
  >
    <source
      :src="link + '#t=50'"
      type="application/x-mpegURL"
    />
  </video>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUpdated, ref, computed } from 'vue'
import Hls from 'hls.js'

export interface Props {
  previewImageLink?: string
  link?: string
  isPreview?: boolean
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  previewImageLink: '',
  link: '',
  isPreview: false,
  progress: 0
})

const emit = defineEmits(['pause'])

const video = ref()

onMounted(() => {
  prepareVideoPlayer()
})

onUpdated(() => {
  prepareVideoPlayer()
})

function prepareVideoPlayer() {
  let hls = new Hls()
  let stream = props.link
  hls.loadSource(stream)
  hls.attachMedia(video.value)

  if (props.isPreview) {
    video.value.muted = true
  }

  video.value.currentTime = props.progress
}

const mouseoverName = computed((): string => {
  return props.isPreview ? 'mouseover' : ''
})

const mouseleaveName = computed((): string => {
  return props.isPreview ? 'mouseleave' : ''
})

const muted = computed((): string => {
  return props.isPreview ? 'muted' : ''
})

function turnOn(e: any) {
  e.target.play()
}

function tyrnOff(e: any) {
  e.target.pause()
}

function pause() {
  if (!props.isPreview && video.value.currentTime) {
    emit('pause', video.value.currentTime)
  }
}

function changeSpeed(e: any) {
  if (e.key === 'w') {
    video.value.playbackRate = video.value.playbackRate + 0.25;
  } else if (e.key === 's') {
    video.value.playbackRate = video.value.playbackRate - 0.25;
  }
}
</script>

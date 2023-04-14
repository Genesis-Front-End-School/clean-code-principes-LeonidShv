<template>
  <div class="course">
    <router-link
      :to="`/course/${id}`"
      class="course-videoWrapper"
    >
      <VideoPlayer
        class="course-video"
        isPreview
        :previewImageLink="`${previewImageLink}/cover.webp`"
        :link="courseVideoPreview?.link"
      />
    </router-link>

    <div class="course-info">
      <router-link
        :to="`/course/${id}`"
        class="course-link"
        >{{ title }}</router-link
      >
      <q-rating
        class="course-rating"
        readonly
        :model-value="rating"
        size="18px"
        :max="5"
        color="yellow"
        icon-half="star_half"
      />
      <p class="course-text">{{ description }}</p>
      <p class="course-duration">{{ lessonsCount }} lectures</p>
      <div class="course-badges">
        <q-badge
          class="course-badge"
          v-for="(skill, i) in skills"
          color="yellow"
          text-color="dark"
          :key="i"
        >
          {{ skill }}
        </q-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/VVideoPlayer/index.vue'
import { defineProps } from 'vue'

export interface CourseVideoPreview {
  link?: string
  previewImageLink?: string
}

export interface Props {
  title?: string
  lessonsCount?: number
  skills?: string[]
  rating?: number
  description?: string
  previewImageLink?: string
  courseVideoPreview?: CourseVideoPreview | void
  id?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  lessonsCount: 0,
  skills: () => [],
  rating: 0,
  description: '',
  previewImageLink: '',
  courseVideoPreview: () => {},
  id: ''
})
</script>

<style lang="scss" scoped>
.course {
  display: flex;
  gap: 16px;
  padding-bottom: 24px;
  box-shadow: 0px 0.5px 0px 0px rgba(255, 255, 255, 0.4);

  &-videoWrapper {
    width: 25%;
  }

  &-video {
    width: 100%;
    height: 100%;
  }

  &-info {
    width: 75%;
  }

  &-text {
    margin-top: 16px;
  }

  &-link {
    color: var(--light);
    display: block;
    font-size: 18px;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      background-color: var(--dark);
      color: var(--yellow);
    }
  }

  &-badge:not(:first-child) {
    margin-left: 8px;
  }
}
</style>

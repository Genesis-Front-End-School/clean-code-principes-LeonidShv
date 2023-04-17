<template>
  <section class="course">
    <h2>{{ pageTitle }}</h2>
    <div class="course-wrapper">
      <div class="course-videoWrapper">
        <VideoPlayer
          @pause="checkPause"
          :previewImageLink="`${choosenLessson.previewImageLink}/lesson-${choosenLessson.order}.webp`"
          :link="choosenLessson?.link"
          :progress="choosenLessson?.progress"
          class="course-video"
        />

        <div
          ref="chat"
          class="course-chat"
        >
          <div class="course-messages">
            <q-chat-message
              v-for="({ name, avatar, text, sent }, i) in messages"
              :key="i"
              :name="name"
              :avatar="avatar"
              :text="text"
              :sent="sent"
              name-color="grey-1"
            />
          </div>

          <q-input
            class="course-textarea"
            v-model="message"
            placeholder="write a message"
            @keyup.enter="sendMessage"
            dark
            filled
            type="textarea"
            autogrow
          />
        </div>
      </div>
      <div class="course-listLessons">
        <q-inner-loading
          :showing="!courseResponsed?.lessons?.length"
          dark
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
        <div
          v-for="{
            duration,
            order,
            status,
            title,
            id,
            completed
          } in courseResponsed?.lessons?.sort(compare)"
          :key="id"
          :class="{
            'course-lesson--locked': status === 'locked'
          }"
          class="course-lesson"
          @click="chooseLesson(id)"
          :title="status === 'locked' ? 'Lesson is locked' : ''"
        >
          <q-checkbox
            :model-value="!!completed"
            dark
            color="orange"
          />
          <div>
            <p
              class="course-lessonTitle"
              :class="{ 'course-lessonTitle--active': choosenLessson.id === id }"
            >
              {{ order }}.{{ title }}
            </p>
            <p class="course-lessonTime">
              <IconTime />{{ Math.round((100 * duration) / 60) / 100 }} min
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/VVideoPlayer/index.vue'
import { ref, nextTick, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import IconTime from '@/assets/icons/time.svg'
import { avatarSrc } from '@/constants/index.ts'

import { getCourse } from '@/api'

const courseResponsed: any = ref({})
const choosenLessson: any = ref({})
const pageTitle = ref('')

const idCourse = computed(() => useRoute()?.params?.id)

function compare(a: any, b: any) {
  if (a.order < b.order) {
    return -1
  }
  if (a.order > b.order) {
    return 1
  }
  return 0
}

onMounted(async () => {
  const id: any = idCourse.value

  if (id in localStorage) {
    const courseWithProgress = JSON.parse(localStorage.getItem(id) || 'null')
    updateData(courseWithProgress)
  } else {
    const course = await getCourse(id)

    const lessonsWithProgress = course.data?.lessons.map((lesson: any) => ({
      ...lesson,
      progress: 0,
      completed: false
    }))
    const courseWithProgress = { ...course.data, lessons: lessonsWithProgress }

    localStorage.setItem(id, JSON.stringify(courseWithProgress))

    updateData(courseWithProgress)
  }
})

function updateData(courseWithProgress: any) {
  courseResponsed.value = courseWithProgress
  choosenLessson.value = courseWithProgress?.lessons[0]
  pageTitle.value = courseWithProgress.title
}

function chooseLesson(id: string) {
  choosenLessson.value = courseResponsed.value?.lessons.find((lesson: any) => lesson.id === id)
}

function checkPause(progress: number) {
  choosenLessson.value.progress = progress

  if (progress >= choosenLessson.value.duration - 3) {
    // progress can change up and down, but completed cannot be marked as false [when rewinding, not to lose the progress of the lesson]
    choosenLessson.value.completed = true
  }

  const foundedIndex = courseResponsed.value?.lessons.findIndex(
    (lesson: any) => lesson.id == choosenLessson.value.id
  )
  courseResponsed.value.lessons[foundedIndex] = choosenLessson.value
  const id: any = idCourse.value

  localStorage.setItem(id, JSON.stringify(courseResponsed.value))
}

const message = ref('')
const messages = ref([
  {
    name: 'Jane',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    text: [`Explaine, please, how can I do this ...`],
    sent: false
  },
  {
    name: 'Sam',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
    text: [`I've faced with the same problem, just do this and this`],
    sent: false
  }
])

const chat = ref()

function sendMessage() {
  message.value = message.value.trim()

  if (!message.value) return

  const msg: any = {
    name: 'Me',
    avatar: avatarSrc,
    text: [message.value],
    sent: true
  }

  messages.value.push(msg)
  message.value = ''

  nextTick(function () {
    chat.value.scrollTop = chat.value.scrollHeight
  })
}
</script>

<style lang="scss" scoped>
.course {
  $titleHeight: 60px;

  &-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &-videoWrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &-video {
    width: 100%;
    height: 45%;
  }

  &-listLessons,
  &-videoWrapper {
    height: calc(
      100vh - var(--header-height) - var(--footer-height) - var(--section-padding-block) -
        $titleHeight
    );
  }

  &-listLessons {
    padding: 16px;
    width: 25%;
    overflow: auto;
    background: var(--dark);
  }

  &-lesson {
    display: flex;
    align-items: center;
    box-shadow: var(--shadow);

    &:not(:first-child) {
      padding: 8px 0;
    }

    &:first-child {
      padding-bottom: 8px;
    }

    &--locked {
      position: relative;
      cursor: not-allowed;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--grey);
        opacity: 0.3;
      }
    }
  }

  &-lessonTitle {
    margin-left: 8px;

    &--active {
      color: var(--orange);
    }
  }

  &-lessonTime {
    display: flex;
    gap: 8px;
    font-size: 12px;
    margin-left: auto;
  }

  &-chat {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 45%;
    overflow: auto;
    position: relative;
  }

  &-messages {
    margin-bottom: 16px;
  }

  &-textarea {
    margin-top: auto;
    border-radius: 20% / 50%;
  }
}
</style>

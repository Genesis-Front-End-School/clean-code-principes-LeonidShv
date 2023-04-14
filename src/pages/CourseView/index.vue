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
    avatar:
      'data:image/png;base64,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',
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

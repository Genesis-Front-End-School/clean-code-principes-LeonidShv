<template>
  <div>
    <div class="home-header">
      <h2>Courses</h2>

      <q-select
        class="input"
        v-model="sortingOption"
        dark
        :options="sortingOptions"
        label="Sort by"
      />
    </div>

    <div class="home-coursesList">
      <q-inner-loading
        :showing="!useGlobalStore().coursesLists.length"
        dark
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
      <Course
        v-for="{
          id,
          title,
          rating,
          lessonsCount,
          meta,
          description,
          previewImageLink
        } in useGlobalStore().paginatedCoursesLists"
        :key="id"
        :title="title"
        :rating="rating"
        :lessonsCount="lessonsCount"
        :skills="meta['skills']"
        :description="description"
        :previewImageLink="previewImageLink"
        :courseVideoPreview="meta['courseVideoPreview']"
        :id="id"
        class="home-course"
      />
    </div>

    <q-pagination
      v-model="pagination"
      @update:model-value="onPagination"
      color="yellow"
      active-text-color="dark"
      :max="maxPages"
      :max-pages="maxElementsOnPage"
      boundary-numbers
      direction-links
      class="home-pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Course from './Course.vue'
import { getPreviewCourses } from '@/api'
import { useGlobalStore } from '@/stores/global'

onMounted(async () => {
  const coursesLists = await getPreviewCourses()
  useGlobalStore().setCoursesLists(coursesLists.data.courses)
  onPagination(1)
})

const sortingOption = ref('')
const sortingOptions = [
  {
    label: 'Rating',
    value: 'rating'
  },
  {
    label: 'Price',
    value: 'price'
  }
]

const maxElementsOnPage = ref(10)
const maxPages = computed(() =>
  Math.ceil(useGlobalStore().coursesLists.length / maxElementsOnPage.value)
)

const pagination = ref(1)

function onPagination(pageNumber: number) {
  const firstElement = (pageNumber - 1) * maxElementsOnPage.value
  const lastElement = pageNumber * maxElementsOnPage.value
  const paginatedCourses = useGlobalStore().coursesLists.slice(firstElement, lastElement)

  useGlobalStore().setPaginatedCoursesLists(paginatedCourses)
}
</script>

<style lang="scss" scoped>
.home {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &-coursesList {
    position: relative;
    min-height: calc(100vh - var(--header-height) - var(--footer-height) - 180px);
  }

  &-course:not(:first-child) {
    margin-top: 24px;
  }

  &-pagination {
    width: fit-content;
    margin: 24px auto;
  }
}
</style>

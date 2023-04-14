import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isDarkTheme: false,
    coursesLists: [],
    paginatedCoursesLists: [],
    course: {},
  }),
  getters: {},
  actions: {
    toggleDarkTheme() {
      this.isDarkTheme = !this.isDarkTheme
    },
    setCoursesLists(coursesLists: any) {
      this.coursesLists = coursesLists;

      localStorage.setItem("coursesLists", JSON.stringify(coursesLists));
    },
    setCourse(course: any) {
      this.course = course;

      localStorage.setItem(course.id, JSON.stringify(course));
    },
    setPaginatedCoursesLists(paginatedCoursesLists: any) {
      this.paginatedCoursesLists = paginatedCoursesLists;
    },
  }
})

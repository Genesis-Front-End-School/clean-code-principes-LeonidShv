import { api } from '../lib/axios'

export const getToken = async () => {
  try {
    const resp = await api.get('/auth/anonymous?platform=subscriptions')
    return resp.data.token
  } catch (e) {
    return null
  }
}

export const getPreviewCourses = async () => {
  try {
    const data = await api.get('/core/preview-courses')
    return data
  } catch (e) {
    return null
  }
}

export const getCourse = async (id) => {
  try {
    const data = await api.get(`/core/preview-courses/${id}`)
    return data
  } catch (e) {
    return null
  }
}

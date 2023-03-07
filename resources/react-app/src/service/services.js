import axiosInstance from '../utils/axiosClient'
import AxiosClientSchedule from '../utils/axiosClientSchedule'

//Events API
const fetchTalking = async (pagination) => {
  const result = await axiosInstance.get(`talks?page=${pagination}`)
  return result.data
}
const getByTalks = async (slug) => {
  const result = await axiosInstance.get(`talk/${slug}`)
  return result.data
}
const fetchEvents = async () => {
  const result = await axiosInstance.get(`events`)
  return result.data
}
const getByEventsId = async (id) => {
  const result = await axiosInstance.get(`event/${id}`)
  return result.data.data
}

const getByClubsId = async (id) => {
  const result = await axiosInstance.get(`club/${id.slug}`)
  return result.data
}
const fetchPages = async () => {
  const result = await axiosInstance.get('pages')

  return result.data
}
const fetchPagesId = async (slug) => {
  const result = await axiosInstance.get(`page/${slug}`)
  return result.data
}
const fetchClubs = async () => {
  const result = await axiosInstance.get('clubs')
  return result.data
}
const getByPagesId = async (id) => {
  const result = await axiosInstance.get(`page/${id}`)
  return result.data
}
const contactPost = async (data) => {
  const result = await axiosInstance.post('contact', data)
  return result
}
const joinUsPost = async (data) => {
  const result = await axiosInstance.post('join-us', data)
  return result
}
const joinUsPhoneValidation = async (data) => {
  const result = await axiosInstance.post('join-us/validate', data)
  return result
}
const fetchHomeSlider = async () => {
  const result = await axiosInstance.get('get-slider')
  return result
}
const fetchServices = async () => {
  const result = await axiosInstance.get('services')
  return result
}
const fetchSchedule = async (clubCode) => {
  const result = await AxiosClientSchedule.get(clubCode)
  return result.data
}
const fetchAdvantage = async () => {
  const result = await axiosInstance.get('advantages')
  return result.data
}
const fetchAdvantageCategory = async () => {
  const result = await axiosInstance.get('avantage-category')
  return result.data
}
const fetchAvantageBanner = async () => {
  const result = await axiosInstance.get('advantage-banner')
  return result.data
}
const exportFunction = {
  getByTalks,
  fetchTalking,
  fetchEvents,
  getByEventsId,
  fetchClubs,
  getByClubsId,
  fetchPages,
  getByPagesId,
  contactPost,
  fetchSchedule,
  joinUsPost,
  joinUsPhoneValidation,
  fetchHomeSlider,
  fetchServices,
  fetchPagesId,
  fetchAdvantage,
  fetchAdvantageCategory,
  fetchAvantageBanner,
}

export default exportFunction

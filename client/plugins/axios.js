export default function ({ $axios }) {
  $axios.defaults.baseURL = process.env.API_BASE_URL
}

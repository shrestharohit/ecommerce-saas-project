export default function ({ $axios, error }) {
  $axios.defaults.baseURL = process.env.API_BASE_URL
}

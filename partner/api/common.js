export default {
  getCountry: () => 'api/v1/common/country/',
  getCity: () => '/api/v1/common/city/',
  getVenue: () => '/api/v1/control-panel/venue/',
  deleteVenue: venueSlug => `/api/v1/control-panel/venue/${venueSlug}`
}

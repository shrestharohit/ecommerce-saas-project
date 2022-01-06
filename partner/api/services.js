export default {
  getCategory: venueSlug => `/api/v1/service/${venueSlug}/category/`,
  createCategory: venueSlug => `/api/v1/service/${venueSlug}/category/`,
  updateCategory: (id, venueSlug) =>
    `/api/v1/service/${venueSlug}/category/${id}/`,
  deleteCategory: (id, venueSlug) =>
    `/api/v1/service/${venueSlug}/category/${id}/`,
  getService: venueSlug => `/api/v1/service/${venueSlug}/`,
  createService: venueSlug => `/api/v1/service/${venueSlug}/`,
  updateService: (id, venueSlug) => `/api/v1/service/${venueSlug}/${id}/`
}

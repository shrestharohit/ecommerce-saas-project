export default {
  getClient: venueSlug => `/api/v1/control-panel/${venueSlug}/client/`,
  getClientDetails: (id, venueSlug) =>
    `/api/v1/control-panel/${venueSlug}/client/${id}/`,
  createClient: venueSlug => `/api/v1/control-panel/${venueSlug}/client/`,
  updateClient: (id, venueSlug) =>
    `/api/v1/control-panel/${venueSlug}/client/${id}/`,
  deleteClient: (id, venueSlug) =>
    `/api/v1/control-panel/${venueSlug}/client/${id}/`,
  blockClient: (id, venueSlug) =>
    `/api/v1/control-panel/${venueSlug}/client/${id}/block/`,
  unblockClient: (id, venueSlug) =>
    `/api/v1/control-panel/${venueSlug}/client/${id}/unblock/`
}

export default {
  getEmployee: venueSlug => `api/v1/control-panel/${venueSlug}/staff/`,
  getEmployeeDetails: (id, venueSlug) =>
    `api/v1/control-panel/${venueSlug}/staff/${id}/`,
  postEmployee: venueSlug => `api/v1/control-panel/${venueSlug}/staff/`,
  updateEmployee: (id, venueSlug) =>
    `api/v1/control-panel/${venueSlug}/staff/${id}/`,
  updateEmployeeSchedule: (staffId, id) =>
    `api/v1/control-panel/${staffId}/staff-working-shift/${id}/`
}

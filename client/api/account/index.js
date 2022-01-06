export default {
  clientRegister: () => 'api/v1/user/client-register/',
  requestPasswordChange: () => 'api/v1/user/send/password-reset-email/',
  changePassword: (id, token) => `/api/v1/user/password-reset/${id}/${token}/`,
  activateAccount: (id, token) => `/api/v1/user/activate/${id}/${token}/`
}

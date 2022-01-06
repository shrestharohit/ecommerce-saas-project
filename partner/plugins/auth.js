export default function ({ $auth }) {
  if (!$auth.loggedIn) {
    return
  }
  const remember = $auth.$storage.getCookie(
    `_remember.${$auth.options.defaultStrategy}`
  )

  if (typeof remember !== 'undefined') {
    if ($auth.strategy.token.get() !== remember) {
      $auth.setUserToken(remember)
    }
  }
}

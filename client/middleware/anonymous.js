export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    return redirect({ name: 'user-profile-id', params: { id: 'me' } })
  }
}

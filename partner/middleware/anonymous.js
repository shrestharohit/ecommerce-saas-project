export default function ({ store, redirect, $axios }) {
  if (store.state.auth.loggedIn) {
    const dataInLocalStorage = JSON.parse(
      window.localStorage.getItem('activeVenue')
    )
    if (dataInLocalStorage) {
      return redirect({
        name: 'admin-slug-dashboard',
        params: { slug: dataInLocalStorage.slug }
      })
    } else {
      return $axios.$get('/api/v1/control-panel/venue/').then(response => {
        if (response && response.results && response.results.length) {
          redirect({
            name: 'admin-slug-dashboard',
            params: { slug: response.results[0].slug }
          })
        } else {
          redirect({
            name: 'mainpage'
          })
        }
      })
    }
  }
}

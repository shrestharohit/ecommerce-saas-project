export function getResourceUrl(contentUrl, filterFields) {
  let filterUrl = '?'
  for (const key in filterFields) {
    const isArray = Array.isArray(filterFields[key])
    let hasValue = false
    if (isArray && filterFields[key].length > 0) {
      hasValue = true
    } else if (!isArray && filterFields[key]) {
      hasValue = true
    }
    if (hasValue) {
      filterUrl += `${key}=${filterFields[key]}&`
    }
  }
  return `${contentUrl}${filterUrl}`
}

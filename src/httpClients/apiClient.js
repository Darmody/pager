import defaultClient from './defaultClient'

const apiClient = ({
  method = 'GET',
  endpoint,
  queryString = {},
  body = {},
  headers = {},
  json,
}) => defaultClient({
  method,
  endpoint,
  queryString,
  body,
  headers,
  json,
})

export default apiClient

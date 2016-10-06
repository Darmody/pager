import defaultClient from './defaultClient'

const apiClient = ({
  method = 'GET',
  endpoint,
  queryString = {},
  body = {},
  headers = {},
  json,
  credentials,
}) => defaultClient({
  method,
  endpoint,
  queryString,
  body,
  headers,
  json,
  credentials,
})

export default apiClient

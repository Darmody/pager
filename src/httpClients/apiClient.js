import config from 'constants/Configuration'
import defaultClient from './defaultClient'

const apiClient = ({
  method = 'GET',
  endpoint,
  queryString = {},
  body = {},
  headers = {},
  json = true,
}) => defaultClient({
  method,
  endpoint: `${config.apiEndpoint}/${endpoint}`,
  queryString,
  body,
  headers,
  json,
})

export default apiClient

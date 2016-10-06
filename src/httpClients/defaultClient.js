import qs from 'qs'

const defaultClient = ({
  method = 'GET',
  endpoint,
  queryString = {},
  body = {},
  headers = {},
  json = false,
  credentials,
  mode,
}) => {
  let theHeaders = headers
  let theBody = body

  if (json) {
    theHeaders = {
      ...headers,
      'Content-Type': 'application/json',
    }

    theBody = JSON.stringify(body)
  } else if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    theBody = qs.stringify(body)
  }

  return fetch(`${endpoint}?${qs.stringify(queryString)}`, {
    method,
    headers: theHeaders,
    body: method === 'GET' ? undefined : theBody,
    mode,
    credentials,
  })
}

export default defaultClient

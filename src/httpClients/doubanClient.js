import defaultClient from './defaultClient'

const apiClient = ({
  method = 'GET',
  endpoint,
  queryString = {},
  body = {},
  headers = {},
}) => defaultClient({
  method,
  endpoint,
  queryString,
  body,
  headers,
})

const auth = (username, password) => apiClient({
  method: 'POST',
  endpoint: 'https://frodo.douban.com/service/auth2/token',
  body: {
    client_id: '0ab215a8b1977939201640fa14c66bab',
    client_secret: '22b2cf86ccc81009',
    grant_type: 'password',
    username,
    password,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

const refreshAuth = refreshToken => apiClient({
  method: 'POST',
  endpoint: 'service/auth2/token',
  body: {
    client_id: process.env.DOUBAN_CLIENT,
    client_secret: process.env.DOUBAN_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

const statuses = ({ token, lastId, count = 1 }) => apiClient({
  method: 'GET',
  endpoint: 'https://api.douban.com/shuo/v2/statuses/home_timeline',
  queryString: {
    since_id: lastId,
    count,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const doubanClient = {
  auth: ({ username, password, token }) => {
    if (token) {
      return refreshAuth(token)
    }
    return auth(username, password)
  },
  statuses,
}

export default doubanClient

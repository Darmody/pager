import crypto from 'crypto'
import qs from 'qs'
import apiClient from './apiClient'

const zhihuHeaders = {
  'x-app-za': qs.stringify({
    OS: 'iOS',
    Release: '10.0.2',
    Model: 'iPhone7,2',
    VersionName: '3.23.1',
    VersionCode: '512',
    Width: '750',
    Height: '1334',
  }),
  // 'X-UDID': 'AABALMJSpQpLBXr5F8UWQCuKvSSdcPrYWsE=',
  'X-API-Version': process.env.ZHIHU_API_VERSION,
  'X-APP-VERSION': process.env.ZHIHU_APP_VERSION,
  'X-APP-Build': 'release',
  Authorization: `oauth ${process.env.ZHIHU_CLIENT_ID}`,
  'User-Agent': 'osee2unifiedRelease/512 CFNetwork/808.0.2 Darwin/16.0.0',
}

const oauthHeader = token => `Bearer ${token}`

const signatureObject = (grandType) => {
  const source = 'com.zhihu.ios'
  const timestamp = +new Date()
  const clientSecret = process.env.ZHIHU_CLIENT_SECRET
  const clientId = process.env.ZHIHU_CLIENT_ID

  const text = `${grandType}${clientId}${source}${timestamp}`
  const signature = crypto.createHmac('sha1', clientSecret).update(text).digest('hex')

  return {
    source,
    timestamp,
    signature,
  }
}

const needCaptcha = () => apiClient({
  method: 'GET',
  endpoint: 'https://api.zhihu.com/captcha',
  headers: zhihuHeaders,
})

const auth = (username, password) => apiClient({
  method: 'POST',
  endpoint: 'https://api.zhihu.com/sign_in',
  body: {
    client_id: process.env.ZHIHU_CLIENT_ID,
    grant_type: 'password',
    username,
    password,
    ...signatureObject('password'),
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...zhihuHeaders,
  },
  credentials: 'include',
})

const feeds = (token, count) => apiClient({
  method: 'GET',
  endpoint: 'https://api.zhihu.com/feeds',
  queryString: {
    limit: count,
    action_feed: true,
    reverse_order: 0,
  },
  headers: {
    ...zhihuHeaders,
    Authorization: oauthHeader(token),
  },
  credentials: 'include',
})

const zhihuClient = {
  auth: ({ username, password }) => auth(username, password),
  needCaptcha,
  feeds: ({ token, count }) => feeds(token, count),
}

export default zhihuClient

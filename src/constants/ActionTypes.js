const APP_PREFIX = '@@PAGER'

// DOUBAN
export const DOUBAN_AUTH_REQUEST = `${APP_PREFIX}/DOUBAN/AUTH/REQUEST`
export const DOUBAN_AUTH_SUCCESS = `${APP_PREFIX}/DOUBAN/AUTH/SUCCESS`
export const DOUBAN_AUTH_FAILURE = `${APP_PREFIX}/DOUBAN/AUTH/FAILURE`

export const DOUBAN_STATUSES_REQUEST = `${APP_PREFIX}/DOUBAN/STATUSES/REQUEST`
export const DOUBAN_STATUSES_SUCCESS = `${APP_PREFIX}/DOUBAN/STATUSES/SUCCESS`
export const DOUBAN_STATUSES_FAILURE = `${APP_PREFIX}/DOUBAN/STATUSES/FAILURE`

// ZHIHU
export const ZHIHU_AUTH_REQUEST = `${APP_PREFIX}/ZHIHU/AUTH/REQUEST`
export const ZHIHU_AUTH_SUCCESS = `${APP_PREFIX}/ZHIHU/AUTH/SUCCESS`
export const ZHIHU_AUTH_FAILURE = `${APP_PREFIX}/ZHIHU/AUTH/FAILURE`
export const ZHIHU_CAPTCHA_TRIGGER = `${APP_PREFIX}/ZHIHU/CAPTCHA/TRIGGER`
export const ZHIHU_CAPTCHA_CLEAN = `${APP_PREFIX}/ZHIHU/CAPTCHA/CLEAN`
export const ZHIHU_FEED_REQUEST = `${APP_PREFIX}/ZHIHU/FEED/REQUEST`
export const ZHIHU_FEED_SUCCESS = `${APP_PREFIX}/ZHIHU/FEED/SUCCESS`
export const ZHIHU_FEED_FAILURE = `${APP_PREFIX}/ZHIHU/FEED/FAILURE`

// GITHUB
export const GITHUB_AUTH = `${APP_PREFIX}/GITHUB/AUTH`
export const GITHUB_EVENTS_REQUEST = `${APP_PREFIX}/GITHUB/EVENTS/REQUEST`
export const GITHUB_EVENTS_SUCCESS = `${APP_PREFIX}/GITHUB/EVENTS/SUCCESS`
export const GITHUB_EVENTS_FAILURE = `${APP_PREFIX}/GITHUB/EVENTS/FAILURE`

// AUTH
export const AUTH_STORE = `${APP_PREFIX}/AUTH/STORE`
export const AUTH_CLEAN = `${APP_PREFIX}/AUTH/CLEAN`
export const AUTH_START = `${APP_PREFIX}/AUTH/START`
export const AUTH_FAILED = `${APP_PREFIX}/AUTH/FAILED`
export const AUTH_END = `${APP_PREFIX}/AUTH/END`

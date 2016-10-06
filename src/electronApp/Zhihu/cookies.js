import moment from 'moment'
import _ from 'ramda'
import { ipcMain as ipc } from 'electron'

export default (win) => {
  ipc.on('setZhihuCookie:request', (event, data) => {
    Object.keys(data).forEach(key => {
      win.webContents.session.cookies.set({
        name: key,
        value: data[key],
        url: 'https://api.zhihu.com',
        expirationDate: +moment().add(1, 'months')
      }, (error) => {
        if (error) {
          console.log('Zhihu cookies set error. ', error)
        }
      })
    })
  })

  win.webContents.on('did-get-response-details',
    (event, status, newURL, originalURL, code, method, referrer, headers) => {
      if (!_.test(/zhihu.com/, originalURL)) return

      const cookies = (headers['set-cookie'] || []).map((cookie) => {
        const [name, ...value] = cookie.split(';')[0].split('=')
        win.webContents.session.cookies.set({
          name,
          value: value.join('='),
          url: 'https://api.zhihu.com',
          expirationDate: +moment().add(1, 'years')
        }, (error) => {
          if (error) {
            console.log('Zhihu cookies set error. ', error)
          }
        })
      })
  })
}

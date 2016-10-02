import { shell } from 'electron'

const notify = (title, content, icon, link) => {
  const notification = new Notification(title, {
    body: content,
    icon,
  })
  notification.onclick = (event) => {
    event.preventDefault()
    shell.openExternal(link)
  }
}

export const doubanNotify = (...args) => notify('豆瓣', ...args, 'http://www.douban.com')

export default notify

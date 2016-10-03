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

export const githubNotify = (actor, repo, payload, type) => {

  let content = ''
  switch (type) {
    case 'WatchEvent':
      content = `${actor.display_login} ${payload.action} ${repo.name}`
      break
    case 'PublicEvent':
      content = `${actor.display_login} made ${repo.name} public`
      break
    case 'CreateEvent':
      content = `${actor.display_login} created ${repo.name}`
      break
    case 'ForkEvent':
      content = `${actor.display_login} forked ${repo.name}`
      break
    case 'MemberEvent':
      content = `${actor.display_login} ${payload.action} ${payload.member.login}
      to ${repo.name}`
      break
    default:
      break
  }

  const icon = actor.avatar_url
  notify('Github', content, icon, 'http://github.com')
}

export default notify

import _ from 'ramda'
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

const replaceStars = (content) => {
  const starsPattern = /\[score\](.*)\[\/score\]/
  const matches = _.match(starsPattern, content)
  if (matches[0]) {
    const stars = _.join('', _.repeat('★', parseInt(matches[0][7], 10)))
    return _.replace(starsPattern, stars, content)
  }

  return content
}

export const doubanNotify = (status) => {
  const { title, text, user, attachments } = status
  const resharedStatus = status.reshared_status
  let content = ''
  let icon = ''

  if (resharedStatus) {
    const resharedStatusText = resharedStatus.text ? `"${resharedStatus.text}"` : ''
    const resharedStatusTitle = resharedStatus.attachments[0].title ?
      `${resharedStatus.attachments[0].title} ` : ''
    content = `${resharedStatus.user.screen_name} ${resharedStatus.title} ` +
      `${resharedStatusTitle} ${resharedStatusText} 由 ${user.screen_name} 转播`
    icon = resharedStatus.user.small_avatar
  } else {
    content = `${user.screen_name} ${title} ` +
      `${attachments[0].title ? `${attachments[0].title} ` : ''}${text}`
    icon = user.small_avatar
  }

  content = replaceStars(content)

  notify('豆瓣', content, icon, 'http://www.douban.com')
}

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

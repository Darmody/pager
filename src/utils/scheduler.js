export function doubanScheduler() {
  const fetchStatuses = () => {
    const { doubanToken, doubanStatuses } = this.props
    if (doubanToken) {
      doubanStatuses({ token: doubanToken })
    }
  }

  window.setTimeout(fetchStatuses, 2 * 1000)
  window.setInterval(fetchStatuses, 30 * 1000)
}

export function githubScheduler() {
  const fetchEvents = () => {
    const { githubEvents, githubUsername } = this.props
    if (githubUsername) {
      githubEvents({ username: githubUsername })
    }
  }

  window.setTimeout(fetchEvents, 2 * 1000)
  window.setInterval(fetchEvents, 5 * 60 * 1000)
}

export default function scheduler() {
  this::doubanScheduler()
  this::githubScheduler()
}

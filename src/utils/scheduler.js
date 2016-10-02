export function doubanScheduler() {
  const fetchStatuses = () => {
    const { doubanToken, doubanStatuses } = this.props
    if (doubanToken) {
      doubanStatuses({ token: doubanToken })
    }
  }

  window.setInterval(fetchStatuses, 10 * 1000)
}

export default function scheduler() {
  this::doubanScheduler()
}

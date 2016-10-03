import apiClient from './apiClient'

const events = username => apiClient({
  method: 'GET',
  endpoint: `https://api.github.com/users/${username}/received_events/public`,
})

const githubClient = {
  events: ({ username }) => events(username),
}

export default githubClient

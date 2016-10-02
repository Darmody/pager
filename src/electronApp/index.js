import { BrowserWindow, app, ipcMain as ipc } from 'electron'
import merge from 'merge-deep'
import electronStore from 'electron-json-storage'
import AuthWindow from './AuthWindow'
import createTray from './Tray'

const handleAuthStore = () => {
  ipc.on('setAuthInfo:request', (event, data) => {
    electronStore.get('authConfig', (error, originData) => {
      electronStore.set('authConfig', merge(originData || {}, data))
    })
  })

  ipc.on('getAuthInfo:request', (event) => {
    electronStore.get('authConfig', (error, data) => {
      event.sender.send('getAuthInfo:response', data)
    })
  })
}

const onAppReady = () => {
  handleAuthStore()
  AuthWindow.create()
  createTray({
    onClickAuthMenu: AuthWindow.create,
  })
}

app.on('before-quit', AuthWindow.setForceClose)

app.on('activate', AuthWindow.show)

app.on('ready', onAppReady)

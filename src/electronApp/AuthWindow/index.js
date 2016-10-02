import { BrowserWindow } from 'electron'

let win = null

const create = () => {
  if (!win) {
    win = new BrowserWindow({
      width: 400,
      height: 600,
      webPreferences: {
        webSecurity: false,
      }
    })

    win.on('closed', () => {
      win = null
    })

    win.loadURL('http://localhost:3000')

    win.on('close', (event) => {
      if (!win || win.forceClose) return

      event.preventDefault()
      win.hide()
    })
  } else {
    win.show()
  }
}

const show = () => win && win.show

const setForceClose = () => { win.forceClose = true }

export default {
  create,
  show,
  setForceClose,
}

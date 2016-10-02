import { Menu, Tray } from 'electron'
import path from 'path'

const createTray = ({
  onClickAuthMenu,
}) => {
  const tray = new Tray(path.join(__dirname, './pager.png'))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '账号绑定...',
      accelerator: 'Cmd+Ctrl+=',
      click: onClickAuthMenu,
    },
  ])

  tray.setToolTip('Pager')
  tray.setContextMenu(contextMenu)

  return tray
}

export default createTray

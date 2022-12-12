//添加程序自动检查更新的依赖
require('update-electron-app')

const { app, BrowserWindow, ipcMain, dialog } = require('electron')
let path = require('path')

async function handleFileOpen(){
  const {canceled,filePaths} = await dialog.showOpenDialog()
  if(canceled){
    return
  }else{
    return filePaths[0]
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 960,
    height: 540,
    minWidth: 960,
    minHeight: 540,
    webPreferences: {
        preload: path.join(__dirname,'preload.js'),
    },
  })
  ipcMain.handle('ping', ()=> 'pong')
  ipcMain.on('set-title',(event,title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
  win.loadFile('index.html')
}



app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile',handleFileOpen)
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
});

app.on('window-all-closed', ()=>{
    if (process.platform!== 'darwin') app.quit();
});
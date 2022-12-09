const { app, BrowserWindow, ipcMain } = require('electron')
let path = require('path')

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
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
});

app.on('window-all-closed', ()=>{
    if (process.platform!== 'darwin') app.quit();
});

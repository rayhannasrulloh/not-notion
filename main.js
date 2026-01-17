const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false 
    },
    // Tambahkan ikon di taskbar (opsional, jika file icon.ico ada)
    icon: path.join(__dirname, 'icon.ico') 
  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)
}

// --- BAGIAN PENTING: SETTING STARTUP ---
// Fungsi ini memerintahkan Windows untuk membuka aplikasi saat login
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,    // True = Buka otomatis saat login/startup
  path: process.execPath,
  args: [
    '--process-start-args', `"--hidden"` // Opsional: argumen tambahan
  ]
})
// ----------------------------------------

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
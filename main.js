const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'libs/img/mouse-animal.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'libs/js/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('templates/choose_version.html');

  // Open target="_blank" links in the user's default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'deny' };
  });

  // Open navigated external links in browser
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http') && !url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Check for updates once the window is ready
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// AutoUpdater event handlers

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...');
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available and is being downloaded in the background.',
  });
});

autoUpdater.on('update-not-available', () => {
  console.log('No updates available.');
});

autoUpdater.on('error', (err) => {
  console.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent.toFixed(2)}% (${progressObj.transferred}/${progressObj.total})`;
  console.log(log_message);
  // You can send this progress info to your renderer process via IPC if you want
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'Update downloaded. The application will now quit and install the update.',
    buttons: ['Restart Now', 'Later']
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

// App lifecycle

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Your existing IPC handlers here...

ipcMain.handle('showCloseWarning', async () => {
  const result = await dialog.showMessageBox({
    type: 'warning',
    buttons: ['Cancel', 'Quit'],
    defaultId: 1,
    cancelId: 0,
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to quit the application?'
  });
  return result.response;
});

ipcMain.handle('showNavigationWarning', async () => {
  const result = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Stay', 'Continue'],
    defaultId: 1,
    cancelId: 0,
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Do you want to leave this page?'
  });
  return result.response;
});

ipcMain.handle('force-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});

ipcMain.handle('openExternal', (event, url) => {
  shell.openExternal(url); 
});


// --- LOCAL STORAGE SYSTEM --- //
// Get the safe user data path provided by the OS
const userDataPath = app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'saved_distances.json');

// Helper function to read the data
function readData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([])); // Create empty array if file doesn't exist
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

// IPC Handler: Send data to frontend when requested
ipcMain.handle('get-saved-distances', () => {
  return readData();
});

// IPC Handler: Save new data from frontend
ipcMain.handle('save-distance', (event, newEntry) => {
  try {
    const data = readData();
    // Create a unique ID for the entry
    newEntry.id = Date.now().toString(); 
    data.push(newEntry);
    
    // Write the updated array back to the file securely
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return { success: true, data: data };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, error: error.message };
  }
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showCloseWarning: () => ipcRenderer.invoke('showCloseWarning'),
  showNavigationWarning: () => ipcRenderer.invoke('showNavigationWarning'),
  forceClose: () => ipcRenderer.invoke('force-close'),
  openExternal: (url) => ipcRenderer.invoke('openExternal', url),

  // ✅ New Local Storage APIs
  getSavedDistances: () => ipcRenderer.invoke('get-saved-distances'),
  saveDistance: (data) => ipcRenderer.invoke('save-distance', data)
});

const { contextBridge, ipcRenderer, dialog } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const Toastify = require('toastify-js')

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on:  (channel, data, func) => ipcRenderer.on(channel, data, (event, ...args) => func(...args)),
    request: (channel, data) => ipcRenderer.invoke(channel, data),
    // selectFolder: () => ipcRenderer.invoke('dialog:openDirectory')
});

contextBridge.exposeInMainWorld('fs', {
    readdirSync: (...args) => fs.readdirSync(...args),
});
import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", {
      ...electronAPI,
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) =>
          ipcRenderer.invoke(channel, ...args),
        send: (channel: string, ...args: any[]) =>
          ipcRenderer.send(channel, ...args),
        on: (
          channel: string,
          listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
        ) => ipcRenderer.on(channel, listener),
        once: (
          channel: string,
          listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
        ) => ipcRenderer.once(channel, listener),
        removeListener: (channel: string, listener: (...args: any[]) => void) =>
          ipcRenderer.removeListener(channel, listener),
        removeAllListeners: (channel: string) =>
          ipcRenderer.removeAllListeners(channel),
      },
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = {
    ...electronAPI,
    ipcRenderer: ipcRenderer,
  };
  // @ts-ignore (define in dts)
  window.api = api;
}

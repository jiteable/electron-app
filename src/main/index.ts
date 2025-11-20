import { app, shell, BrowserWindow, ipcMain, screen } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

// 全局变量存储 ListWindow 实例
let ListWindow: BrowserWindow | null = null;

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1050,
    height: 700,
    show: false,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    resizable: true, // 改为true以支持窗口调整大小
    frame: false, // 确保禁用原生框架
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true, // 明确设置 contextIsolation 为 true
      nodeIntegration: false, // 确保 nodeIntegration 为 false 以保证安全性
    },
  });

  let winHeight = screen.getPrimaryDisplay().bounds.height;

  // mainWindow.setBounds({
  //   y: winHeight - 250,
  // });

  // console.log(screen.getPrimaryDisplay());
  // mainWindow.webContents.openDevTools();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  // 监听窗口控制事件
  ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("window-toggle-maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    mainWindow.close();
  });

  // 向渲染进程通知窗口状态变化
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-unmaximized");
  });

  // 创建子窗口的函数
  const createListWindow = () => {
    // 如果 ListWindow 已经存在但不可见，直接显示它
    if (ListWindow && !ListWindow.isDestroyed() && !ListWindow.isVisible()) {
      ListWindow.show();
      return;
    }

    // 如果 ListWindow 不存在或已被销毁，创建新的窗口
    ListWindow = new BrowserWindow({
      width: 600,
      height: 170,
      show: false,
      titleBarStyle: "hidden",
      ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
      autoHideMenuBar: true,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    });

    let winHeight = screen.getPrimaryDisplay().bounds.height;
    ListWindow.setBounds({
      y: winHeight - 250,
    });

    // 设置窗口关闭事件
    ListWindow.on("closed", () => {
      ListWindow = null;
    });

    ListWindow.on("ready-to-show", () => {
      if (ListWindow) {
        ListWindow.show();
      }
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      ListWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/#/list");
    } else {
      ListWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
  };

  // 主进程接受渲染进程消息
  ipcMain.handle("new-list", async () => {
    // 检查 ListWindow 是否已经存在且可见
    if (ListWindow && !ListWindow.isDestroyed() && ListWindow.isVisible()) {
      // 如果窗口已经存在且可见，就让它隐藏
      ListWindow.hide();
      return "List window hidden";
    } else {
      // 如果窗口不存在或不可见，就创建或显示它
      createListWindow();
      return "List window created successfully";
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

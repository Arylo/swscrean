import { app, BrowserWindow, ipcMain } from "electron";
import screen = require("./screen");

const wins: BrowserWindow[] = [];
const createWindow = () => {
    screen.parserScreen();
    creatDisployWindow();
    createMainWindow();
};

const createMainWindow = () => {
    if (wins[0]) {
        return;
    }
    // console.log(screen.getObject());
    const win = new BrowserWindow({
        ...screen.getObject().main,
        webPreferences: {
            nodeIntegration: true
        },
        // closable: false,
        // alwaysOnTop: true,
        autoHideMenuBar: true,
        frame: false
    });
    win.loadURL(`file://${__dirname}/../public/index.html`);
    // win.webContents.openDevTools();
    win.on("closed", () => (wins[0] = null));
    win.on("ready-to-show", () => {
        win.show();
        win.focus();
        wins[0] = win;
    });
};

const creatDisployWindow = () => {
    if (wins[1]) {
        return;
    }
    const win = new BrowserWindow({
        ...screen.getObject().display,
        webPreferences: {
            nodeIntegration: true
        },
        // closable: false,
        // alwaysOnTop: true,
        autoHideMenuBar: true,
        frame: false,
        focusable: false
    });
    win.loadURL(`file://${__dirname}/../public/pages/index.html`);
    // win.webContents.openDevTools();
    win.on("closed", () => (wins[1] = null));
    win.on("ready-to-show", () => {
        win.show();
        wins[1] = win;
        if (wins[0]) {
            wins[0].focus();
        }
    });
    ipcMain.on("jump", (event, arg) => {
        // console.log(arg);
        win.loadURL(`file://${__dirname}/../public/pages/${arg}.html`);
    });
};

app.on("ready", (_) => {
    createWindow();
});
app.on("window-all-closed", (_) => process.platform !== "darwin" && app.quit());
app.on("activate", (_) => wins.length !== 2 && createWindow());

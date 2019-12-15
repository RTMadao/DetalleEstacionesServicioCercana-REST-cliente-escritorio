const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow, newStationWindow

const templateMenu = [
    {
        label: 'Archivos',
        submenu: [
            {
                label: 'nueva estacion',
                accelerator: 'Ctrl+N',
                click(){
                    createNewStationWindow()
                }
            }
        ]
    }
]

app.on('ready', ( ) => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('close', () => {
        app.quit();
    })
});

if(process.env.NODE_ENV != 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'mostrar/esconder dev tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

function createNewStationWindow(){
    newStationWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'nueva estacion'
    });
    newStationWindow.setMenu(null); 
    newStationWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newStation.html'),
        protocol: 'file',
        slashes: true
    }))
    newStationWindow.on('close', () => {
        newStationWindow = null;
    })
}
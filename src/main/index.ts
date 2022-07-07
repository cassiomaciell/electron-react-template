import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (process.env.NODE_ENV === "development") {
		win.loadURL("http://localhost:3000");
	} else {
		win.loadFile("app/index.html");
	}
};

app.whenReady().then(() => {
	createWindow();
	if (process.env.NODE_ENV === "development") {
		import("electron-devtools-installer")
			.then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) => {
				installExtension([REACT_DEVELOPER_TOOLS]);
			})
			.catch(console.error);
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

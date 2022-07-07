const path = require("path");

/**
 * @type {import("electron-builder").Configuration}
 */
const config = {
	appId: "com.example.app",
	files: ["./**/*"],
	asar: true,
	nsis: {
		oneClick: false,
		allowToChangeInstallationDirectory: true,
	},
	mac: {
		category: "public.app-category.developer-tools",
	},
	directories: {
		app: path.join(process.cwd(), ".build"),
	},
};

module.exports = config;

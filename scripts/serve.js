const electron = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const webpack = require("webpack");
const config = require("../webpack.config");

const packageJson = require("../package.json");
const mainFile = path.join(process.cwd(), packageJson.main);

/**
 * @type {import("child_process").ChildProcessWithoutNullStreams }
 */
let renderProcess;

const watcher = webpack(config({}, { mode: "development" })).watch(
	{
		stdin: true,
	},
	(err, result) => {
		if (err) {
			console.error(err);
			return;
		}
		if (result) {
			commands.rs();
			console.log(result.toString({ colors: true }));
		}
	}
);

function startProcess() {
	console.log("Starting render process");

	renderProcess = spawn(electron, [mainFile], {
		cwd: process.cwd(),
		stdio: "inherit",
		detached: true,
	});

	renderProcess.on("exit", (code, signal) => {
		console.log("Render process exited", code, signal);
	});
}

const commands = {
	rs() {
		if (renderProcess) {
			renderProcess.kill(2);
		}

		startProcess();
	},
	exit() {
		watcher.close();

		if (renderProcess) {
			renderProcess.kill(2);
		}

		process.exit(2);
	},
};

process.on("SIGTERM", commands.exit);
process.on("SIGINT", commands.exit);

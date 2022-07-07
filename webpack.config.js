const path = require("path");
const { merge } = require("webpack-merge");

module.exports = (_, argv) => {
	/**
	 * @type {import("webpack").Configuration}
	 */
	const shared = {
		mode: argv.mode || "development",
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					include: path.resolve(__dirname, "src", "main"),
					use: [
						{
							loader: "swc-loader",
							options: {
								configFile: path.resolve(__dirname, argv.mode == "production" ? "prod.swcrc" : "dev.swcrc"),
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: [".ts", ".js"],
			roots: [path.resolve(__dirname, "src", "main")],
		},
		output: {
			path: path.resolve(__dirname, ".build"),
		},
	};

	const main = merge(shared, {
		entry: "./src/main/index.ts",
		target: "electron-main",
		output: {
			filename: "main.js",
		},
	});

	const preload = merge(shared, {
		entry: "./src/main/preload.ts",
		target: "electron-preload",
		output: {
			filename: "preload.js",
		},
	});

	return [main, preload];
};

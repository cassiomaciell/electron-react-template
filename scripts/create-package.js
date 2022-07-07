const { writeFileSync } = require("fs");
const path = require("path");
const packageJson = require("../package.json");

writeFileSync(
	path.join(process.cwd(), ".build", "package.json"),
	JSON.stringify(
		{
			name: packageJson.name,
			version: packageJson.version,
			private: true,
			main: "./main.js",
			author: packageJson.author,
			license: packageJson.license,
		},
		null,
		2
	)
);

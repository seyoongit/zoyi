const path = require("path");
const fs = require("fs");
const process = require("process");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)


module.exports = {
    appPublic: resolveApp("public"),
    appHtml: resolveApp("public/index.html"),
    appBuild: resolveApp("build"),
    appIndexJs: resolveApp("src/index.js"),
}
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../configs/webpack.config.dev.js");

const clearConsole = require("react-dev-utils/clearConsole");
const openBrowser = require("react-dev-utils/openBrowser");


const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler);
devServer.listen(3000, "localhost", (err) => {
    if (err) {
        return console.log(err);
    }
    clearConsole()
    openBrowser("http://localhost:3000")
})
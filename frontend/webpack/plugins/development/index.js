const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const configs = require(`../../../config/config.json`);
const appRoot = "./";

const arr = [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
    }),
    new webpack.DefinePlugin({
        "NODE_ENV": JSON.stringify("development"),
        "APP_NAME": JSON.stringify(configs.appName),
        "SITE_NAME": JSON.stringify(configs.siteName),
        "HOST": JSON.stringify(configs.host),
    }),
    new HtmlWebpackPlugin({template: appRoot + "/html/index.html", minify:{
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true
        }}),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
    }),
    new MiniCssExtractPlugin({
        filename: "styles/[name].[fullhash].css",
        chunkFilename: "styles/[name].[fullhash].css"
    }),
];


console.log("array from plugins")

module.exports = arr;
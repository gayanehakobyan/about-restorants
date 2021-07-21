const path = require("path");
const appRoot = "../../..";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require(`../../../config/config.json`);

module.exports = [
    {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, appRoot + "/source/ts"),
        use: "ts-loader"
    },
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
        ]
    },
    {
        test: /\.scss$/,
        include: [
            path.resolve(__dirname, `${appRoot}/source/sass`),
            path.resolve(__dirname, `${appRoot}/node_modules`)
        ],
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                    // importLoaders: 2
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }
        ]
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
            loader: "file-loader",
            options: {
                name: "images/[name].[ext]?[contentHash]"
            }
        }
    },
    {
        test: /\.html$/,
        include: path.resolve(__dirname, appRoot + "/source/html"),
        use: [
            {
                loader: "string-replace-loader",
            },
            {
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }
        ]
    }
];

console.log("array from loaders")
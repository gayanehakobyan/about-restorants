const path = require("path");
const config = {};
const TerserPlugin = require("terser-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const node_env = process.env.NODE_ENV

const DEVELOPMENT = node_env === "production";
const publicPath = "http://" + process.env.npm_package_config_host + ":" + process.env.npm_package_config_port + "/";
//console.log("mtaaaaaaaaaav", process.env.NODE_ENV, publicPath)

config.NODE_ENV = JSON.stringify(node_env);
config["process.env"] = { NODE_ENV: config.NODE_ENV };
process.traceDeprecation = true;

const entry = require("./webpack/entries/" + JSON.parse(config.NODE_ENV));
const plugins = require("./webpack/plugins/" + JSON.parse(config.NODE_ENV));
const loaders = require("./webpack/loaders/" + JSON.parse(config.NODE_ENV));


module.exports = {
    devtool: "inline-source-map",
    context: path.join(__dirname, "source"),
    entry: entry,
    plugins: plugins,
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "/",
        filename: "source/[name][fullhash].js?[contentHash]",
        sourceMapFilename:  "[file].map[query]",
        chunkFilename: "source/[name].chunk.js?[chunkhash]",
        pathinfo: false
    },
    mode: node_env,
    target:"web",
    module: {
        rules: loaders
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.join(__dirname, "build"),
        host: process.env.npm_package_config_host,
        port: process.env.npm_package_config_port,
        clientLogLevel: "none",
        publicPath: publicPath,
        progress: true,
        writeToDisk: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        stats: {
            colors: true,
            assets: false,
            chunkModules: false,
            errors: true,
            errorDetails: true,
            publicPath: true,
            reasons: true,
            timings: true,
            warnings: false,
        }
    },
    optimization: {
        minimize: DEVELOPMENT,
        minimizer: [
            new TerserPlugin({
                //sourceMap: true,
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                parallel: true,
                //cache: true
            }),
        ],
        splitChunks: {
            name: false
        },
        runtimeChunk: true
    }
}
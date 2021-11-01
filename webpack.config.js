const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const miniCssPlugin = require('mini-css-extract-plugin')
const eslintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const getLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const isDev = process.env.NODE_ENV === 'development'
/** @type { import('webpack').WebpackOptionsNormalized } */
const config = {

    mode: isDev ? 'development' : 'production',

    devtool: isDev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',

    entry: [
        isDev ? 'react-hot-loader/patch' : undefined,
        path.resolve(__dirname, 'src', 'index.tsx'),
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },

    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx', '.json'
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.resolve(__dirname, 'src')
        }
    },

    module: {
        rules: [
            // {
            //     test: /\.tsx?/,
            //     use: 'ts-loader',
            // },
            {
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less/,
                use: [
                    isDev ? 'style-loader' :
                    miniCssPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.module\.less/,
                use: [
                    isDev ? 'style-loader' :
                    miniCssPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                getLocalIdent
                            },
                        },
                    },
                    'less-loader',
                ]
            }
        ],
    },

    devServer: {
        port: 8080,
        hot: true,
        open: true,
    },

    plugins: [
        new webpack.CleanPlugin(),
        new htmlPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
        new miniCssPlugin(),
        // new eslintPlugin({
        //     extensions: ['ts', 'tsx'],
        //     exclude: 'node_modules',
        //     files: ['src'],
        //     fix: false,
        //     emitWarning: true,
        // })
    ]
}

module.exports = config
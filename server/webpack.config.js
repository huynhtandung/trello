const path = require('path')
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (props) => ({
	entry: [path.resolve(__dirname, './src/index.ts')],
	mode: props.NODE_ENV,
	target: 'node',
	watch: props.NODE_ENV === 'development',
	resolve: {
		alias: {
			'@constants': path.resolve(__dirname, './src/constants'),
			'@environments': path.resolve(__dirname, './src/environments'),
			'@middlewares': path.resolve(__dirname, './src/middlewares'),
			'@models': path.resolve(__dirname, './src/models'),
			'@routers': path.resolve(__dirname, './src/routers'),
			'@services': path.resolve(__dirname, './src/services'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@validations': path.resolve(__dirname, './src/validations'),
			'@socket': path.resolve(__dirname, './src/socket.ts')
		},
		extensions: ['.ts'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new Dotenv({
			path: path.resolve(
				__dirname,
				props.NODE_ENV === 'development' ? '.env.development' : '.env.production',
			),
			safe: true,
			systemvars: false,
			silent: true,
		}),
	],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'index.js',
	},
	externals: [nodeExternals()],
})

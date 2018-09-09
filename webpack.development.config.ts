﻿import webpack from 'webpack'
import baseConfig from './webpack.config'

(baseConfig.module as any).rules[1].use.unshift('style-loader') // Used to load CSS on dev-server

const config: webpack.Configuration = {
	...baseConfig,
	mode: 'development',
	devtool: 'cheap-eval-source-map',

	devServer: {
		historyApiFallback: true,
		port: 1337,
		overlay: true,
		stats: baseConfig.stats as any
	},

	plugins: [
		...baseConfig.plugins,
		new webpack.WatchIgnorePlugin([
			/css\.d\.ts$/
		])
	]
}

module.exports = config

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: __dirname,
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015'],
				}
			},
			{
				test: /plugin\.css$/,
				loaders: [
					'style', 'css',
				],
			},
		]
	}
}

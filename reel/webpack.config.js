const path = require('path');

module.exports = {
  context: __dirname,
  entry: './js/ClientApp.js',
  devtool: 'eval', /*show file name in debugger rather than bundle.js line in development. not recommended for production*/
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/', /*setting up the static directory*/
    watchContentBase: true, /*hot reloading*/
    historyApiFallback: true /*re-route 404s to the homepage*/
  },
  resolve: {
    extensions: ['.js', '.json'] /*if you don't reference the file with extension (ex. File), webpack will go through to see if there's a File with no extension, then if there's a File.js or a File.json if no File.js is found*/
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre', /*before you do the build process, run this loader*/
        test: /\.js$/ /*if it passes that test then:*/,
        loader: 'eslint-loader',
        exclude: ['_priv', '/node_modules/']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        include: path.resolve(__dirname, 'js'),
        test: /\.js$/ /*if it passes that test then:*/,
        loader: 'babel-loader'
      },
			{
				test: /\.css$/,
				use: [
					'style-loader', {
						loader: 'css-loader', /*allows webpack to be able to read css*/
						options: {
							url: false /*just prevents inlining of images*/
						}
					}
				]
			}
    ]
  }
}
